const buildCommentsQuery = (where = {}, order = []) => ({
    where,
    order
});

module.exports = buildCommentsQuery;