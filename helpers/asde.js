module.exports = (p) => p.then((result) => [null,result]).catch((error) => [error]);