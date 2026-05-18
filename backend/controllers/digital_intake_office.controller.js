const db = require('../models');
const buildDigitalIntakeOfficeQuery = require('../helpers/digital_intake_office.query');
const deleteFile = require('../middlewares/deleteFile');

const generateTrackingCode = async (
    full_name,
    document_type,
    DNI_RUC
) => {

    // Iniciales
    const initials = full_name
        .trim()
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();

    // 3 letras del documento
    const docType = document_type
        .replace(/\s+/g, '')
        .substring(0, 3)
        .toUpperCase();

    // últimos 3 del dni/ruc
    const dniPart = DNI_RUC.toString().slice(-3);

    // prefijo
    const prefix =
        `${initials}-${docType}-${dniPart}`;

    // buscar registros previos
    const count =
        await db.DigitalIntakeOffice.count({
            where: {
                full_name,
                document_type,
                DNI_RUC
            }
        });

    // correlativo
    const correlativo =
        String(count + 1).padStart(5, '0');

    return `${prefix}-${correlativo}`;
};

exports.createDigitalIntake = async (req, res) => {

    try {

        const {
            full_name,
            DNI_RUC,
            email,
            phone_number,
            c_condition,
            verification_code,
            document_type,
            v_subject,
            v_message,
            number_of_pages,
            document_url,
            description
        } = req.body;

        if (
            !full_name ||
            !DNI_RUC ||
            !email ||
            !phone_number ||
            !c_condition ||
            !verification_code ||
            !document_type ||
            !v_subject ||
            !v_message ||
            !number_of_pages
        ) {

            if (req.file) {
                deleteFile(
                    `/pdf/documents/digital_intake_office/${req.file.filename}`
                );
            }

            return res.status(400).json({
                error: 'Complete los campos obligatorios'
            });
        }

        if (!req.file && !document_url) {

            return res.status(400).json({
                error: 'Debe adjuntar un archivo o un enlace'
            });
        }

        let attached_file_url = null;

        if (req.file) {

            attached_file_url = `/pdf/documents/digital_intake_office/${req.file.filename}`;
        }

        const tracking_code =
            await generateTrackingCode(
                full_name,
                document_type,
                DNI_RUC
            );

        const newDigitalIntake =
            await db.DigitalIntakeOffice.create({

                full_name,
                DNI_RUC,
                email,
                phone_number,
                c_condition,
                verification_code,
                document_type,
                v_subject,
                v_message,
                number_of_pages,

                attached_file_url,

                document_url,

                processing_status: 'Pendiente',

                tracking_code,

                description
            });

        return res.status(201).json(newDigitalIntake);

    } catch (error) {
        console.error(error);

        if (req.file) {

            deleteFile(
                `/pdf/documents/digital_intake_office/${req.file.filename}`
            );
        }

        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};

exports.getDigitalIntake = async (req, res) => {
    try {
        const query = buildDigitalIntakeOfficeQuery(
            {},
            [['createdAt', 'ASC']]
        );
        const digitalIntake = await db.DigitalIntakeOffice.findAll(query);
        res.status(200).json(digitalIntake);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Error interno del servidor. Inténtelo de nuevo más tarde.' });
    }
}