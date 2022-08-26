// const prodModel = require('../models/product.js')

// const allProductsStatic = async (req, res) => {
// throw   new Error('sasas')
// const search = 'ab'
// const allProds = await prodModel.find({
//      company: "ikea",
//     name: { $regex: search, $options: 'i' }
//     // featured: true
// })
// res.status(200).json({ allProds, size: allProds.length })
// }

// const allProductsStatic = async (req, res) => {
// console.log(req.query)
// const filterProds = await prodModel.find(req.query)
// res.status(200).json({ filterProds, size: filterProds.length })

// const { featured, company, name } = req.query
// const queyObj = {}

// if (featured) {
//     queyObj.featured = featured === 'true' ? true : false
// }
// if (company) {
//     queyObj.company = company
// }
// if (name) {
//     queyObj.name = { $regex: name, $options: 'i' }

// }

// console.log(queyObj)
// const filterProds = await prodModel.find(queyObj)
// res.status(200).json({ filterProds, size: filterProds.length })
// }

const prodModel = require('../models/product.js')

const allProductsStatic = async (req, res) => {
    // const products = await prodModel.find({
    //     featured: true,
    // })
    // res.status(200).json({ products, total: products.length })

    // const company = await prodModel.find({
    //     company: 'ikea'
    // })

    // res.status(200).json({ company, total: company.length })

    // const name = 'a'
    // const prods = await prodModel.find({
    //     name: { $regex: name, $options: 'i' }
    // })
    // res.status(200).json({ prods, total: prods.length })

    // const prods = await prodModel.find({}).sort('-name price')
    // res.status(200).json({ prods, total: prods.length })

    const prods = await prodModel
        .find({ price: { $gt: 30 } })
        .sort('price')
        .limit(23)
    res.status(200).json({ prods, total: prods.length })
}


const allProducts = async (req, res) => {
    // console.log(req.query)

    const { featured, company, name, sort, fields, numericFilters } = req.query
    const queryOBJ = {}

    if (featured) {
        queryOBJ.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryOBJ.company = company
    }
    if (name) {
        queryOBJ.name = { $regex: name, $options: 'i' }
    }
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filter = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        )
        console.log(filter)

        const options = ['price', 'rating']
        filter = filter.split(',')
            .forEach((item) => {

                const [field, operator, value] = item.split('-')

                if (options.includes(field)) {
                    queryOBJ[field] = { [operator]: Number(value) }
                }
            })
    }

    console.log(queryOBJ)
    // const result = await prodModel.find(queryOBJ)
    let result = prodModel.find(queryOBJ)
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else {
        result = result.sort("createdAt")
    }

    if (fields) {
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    }

    const pageNumber = Number(req.query.page) || 1
    const limits = Number(req.query.limit) || 7
    const skip = (pageNumber - 1) * limits

    result = result.skip(skip).limit(limits)
    const products = await result
    res.status(200).json({ products, total: products.length })
}
module.exports = { allProducts, allProductsStatic }