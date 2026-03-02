import data from '../../server/data/products.json'

export default defineEventHandler((event)=>{
    return{
        data
    }
})