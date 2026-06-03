const digitalIntakeTemplate = (data) => {

    return `
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="utf-8">
    </head>

    <body style="
        margin:0;
        padding:0;
        background:#f4f6f9;
        font-family:Arial, Helvetica, sans-serif;
    ">

        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center">

                    <table
                        width="700"
                        cellpadding="0"
                        cellspacing="0"
                        style="
                            background:#ffffff;
                            margin:30px 0;
                            border-radius:10px;
                            overflow:hidden;
                            box-shadow:0 3px 10px rgba(0,0,0,.1);
                        "
                    >

                        <!-- HEADER -->
                        <tr>
                            <td
                                style="
                                    background:#0d6efd;
                                    color:white;
                                    padding:25px;
                                    text-align:center;
                                "
                            >
                                <h1 style="margin:0;">
                                    I.E.S.P.P. Virgen del Carmen
                                </h1>
                                <br>
                            <h1 style="margin:0;">
                                    Mesa de Partes Virtual
                                </h1>

                                <p style="margin-top:8px;">
                                    Nuevo trámite recibido
                                </p>
                            </td>
                        </tr>

                        <!-- TRACKING -->
                        <tr>
                            <td
                                style="
                                    padding:20px;
                                    text-align:center;
                                "
                            >

                                <p
                                    style="
                                        color:#6c757d;
                                        margin-bottom:10px;
                                    "
                                >
                                    Código de Seguimiento
                                </p>

                                <div
                                    style="
                                        display:inline-block;
                                        background:#e9f2ff;
                                        color:#0d6efd;
                                        padding:12px 25px;
                                        border-radius:8px;
                                        font-size:20px;
                                        font-weight:bold;
                                    "
                                >
                                    ${data.tracking_code}
                                </div>

                            </td>
                        </tr>

                        <!-- DATOS -->
                        <tr>
                            <td style="padding:20px 30px;">

                                <h3
                                    style="
                                        border-bottom:1px solid #ddd;
                                        padding-bottom:10px;
                                    "
                                >
                                    Información del Remitente
                                </h3>

                                <table width="100%">

                                    <tr>
                                        <td><b>Nombre:</b></td>
                                        <td>${data.full_name}</td>
                                    </tr>

                                    <tr>
                                        <td><b>DNI / RUC:</b></td>
                                        <td>${data.DNI_RUC}</td>
                                    </tr>

                                    <tr>
                                        <td><b>Correo:</b></td>
                                        <td>${data.email}</td>
                                    </tr>

                                    <tr>
                                        <td><b>Teléfono:</b></td>
                                        <td>${data.phone_number}</td>
                                    </tr>

                                    <tr>
                                        <td><b>Condición:</b></td>
                                        <td>${data.c_condition}</td>
                                    </tr>

                                </table>

                            </td>
                        </tr>

                        <!-- DOCUMENTO -->
                        <tr>
                            <td style="padding:20px 30px;">

                                <h3
                                    style="
                                        border-bottom:1px solid #ddd;
                                        padding-bottom:10px;
                                    "
                                >
                                    Datos del Documento
                                </h3>

                                <table width="100%">

                                    <tr>
                                        <td><b>Tipo:</b></td>
                                        <td>${data.document_type}</td>
                                    </tr>

                                    <tr>
                                        <td><b>Asunto:</b></td>
                                        <td>${data.v_subject}</td>
                                    </tr>

                                    <tr>
                                        <td><b>Folios:</b></td>
                                        <td>${data.number_of_pages}</td>
                                    </tr>

                                </table>

                                <div
                                    style="
                                        margin-top:20px;
                                        background:#f8f9fa;
                                        padding:15px;
                                        border-left:4px solid #0d6efd;
                                        border-radius:5px;
                                    "
                                >
                                    ${data.v_message}
                                </div>

                            </td>
                        </tr>

                        ${data.document_url
            ? `
                            <tr>
                                <td style="padding:0 30px 20px 30px;">
                                    <b>Enlace:</b>
                                    <br><br>
                                    <a href="${data.document_url}">
                                        ${data.document_url}
                                    </a>
                                </td>
                            </tr>
                            `
            : ''
        }

                        <!-- FOOTER -->
                        <tr>
                            <td
                                style="
                                    background:#f8f9fa;
                                    color:#666;
                                    text-align:center;
                                    padding:20px;
                                    font-size:12px;
                                "
                            >
                                Este correo fue generado automáticamente
                                por la Mesa de Partes Virtual.
                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

    </body>
    </html>
    `;
};

module.exports = digitalIntakeTemplate;