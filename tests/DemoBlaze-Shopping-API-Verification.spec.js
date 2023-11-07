const { test, expect } = require('@playwright/test')


//API verification of a product lifecycle in cart
test.describe('Verification of product cycle in cart', () => {
    const dataSet = {
        "id": "075fb584-9f44-9a8b-3d4d-905ee9469275",
        "cookie": "user=76a768bf-154d-8f6c-39a9-013d31e268bd",
        "prod_id": 1,
        "flag": false
    }
    test('Adding a product to cart', async ({ request }) => {

        //Adding specified product on data set to cart
        const response = await request.post('https://api.demoblaze.com/addtocart',
            {
                data: dataSet
            })
        expect(response.status()).toBe(200)
    })

    test('Verify product in Cart', async ({ request }) => {

        //verifying whether the product selected is added to the cart
        const response = await request.post('https://api.demoblaze.com/viewcart',
            {
                data: dataSet
            })
        const text = await response.text()
        const result = JSON.parse(text)
        expect(await response.status()).toBe(200)
        expect(await result.Items[0].cookie).toEqual(dataSet.cookie)
        expect(await result.Items[0].id).toEqual(dataSet.id)
        expect(await result.Items[0].prod_id).toEqual(dataSet.prod_id)
    })

    test('Remove product from Cart', async ({ request }) => {

        //verification of deleting the item from cart
        const response = await request.post('https://api.demoblaze.com/deletecart',
            {
                data: dataSet
            })
        expect(await response.status()).toBe(200)
        expect(await response.text()).toContain("Item deleted.")
        const text = await response.text()
        const result = JSON.parse(text)
        expect(await response.status()).toBe(200)
        expect(await result).toBe(null)
    })


})
