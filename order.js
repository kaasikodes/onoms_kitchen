// all orders made page
$(document).ready(function () {

    window.addEventListener('scroll',()=>{
        if (window.scrollY > 20) {
            $('.my-header').addClass('fixed-header-container')
            
        } else {
            $('.my-header').removeClass('fixed-header-container')
            
        }
    })

     const setItemsInCart = ()=>{
        let badges = document.querySelectorAll('.items-in-cart');
        let noOfItems = JSON.parse(localStorage.getItem('orders')).length;
        badges.forEach(badge => {
            badge.innerText = noOfItems;
            
        });
       
        
    
    }
    setItemsInCart();


    const totalToBePaid = ()=>{
        let sumToBePaid = 0;
        let orders = localStorage.getItem('orders')?JSON.parse(localStorage.getItem('orders')):[];
        orders.forEach((order)=> sumToBePaid += order.totalPrice)
        $('.totalToBePaid').text(sumToBePaid)
    }

    

    const showOrders = () => {
        let allOrdersContainer = $('.all-orders-made')
        let orders = localStorage.getItem('orders')?JSON.parse(localStorage.getItem('orders')):[];
        allOrdersContainer.empty()
        $.map(orders, (order,i) => {
            allOrdersContainer.append(`
                <li class="list-group-item d-flex flex-column" data-key=${i}>
                
                    <div class = "d-flex justify-content-between">
                    <h6 class="my-0">${order.name}</h6>
                    <span class="text-muted">N${order.totalPrice}</span>
                
                    </div>
                    


                    <small class="d-flex justify-content-between mt-2">
                        <span><a href=${order.orderFile} class="text-primary edit-btn">Edit</a></span>
                        <span><a href="" class="text-danger remove-btn">Remove</a></span>
                    </small>
                </li>
            
            `)

        })

        allOrdersContainer.append(`
                <li class="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>N <span class="totalToBePaid">0</span></strong>
                </li>
            
            `)

        totalToBePaid();

    }


    showOrders();

    
    let listGroups = document.querySelectorAll('.list-group-item .remove-btn')
   for (const listGroup of listGroups) {
        listGroup.addEventListener('click',(e)=>{
            e.preventDefault();
            let orders = JSON.parse(localStorage.getItem('orders'))
            let deletedIndex = Number( e.currentTarget.parentElement.parentElement.parentElement.getAttribute('data-key'))
            console.log(deletedIndex)
            orders = orders.filter((order,i) => i !== deletedIndex)
            localStorage.setItem('orders',JSON.stringify(orders))

            showOrders();
            setItemsInCart();
            // 
        })

       
   }



//    edit order
    let orderBtns = $('.list-group-item .edit-btn')
    orderBtns.click((e)=>{
        e.preventDefault();
        let orders = JSON.parse(localStorage.getItem('orders'))
        let choosenIndex = Number( e.currentTarget.parentElement.parentElement.parentElement.getAttribute('data-key'))
        
        order = orders.filter((order,i) => i === choosenIndex)[0]
        console.log(choosenIndex,order)
        



        console.log(e.currentTarget.getAttribute('href'))
        $('.single-order-form-overlay').addClass('active')
        let orderFile = e.currentTarget.getAttribute('href');
        $('.single-order-form-overlay .result').load(`${orderFile}`,function (responseText,statusText,xhr) {
                if(statusText === 'success') {
                    console.log('All is WELL!')
                }else if(statusText === 'error'){
                    console.log('Ther was en error:' + xhr.statusText)
        
                }


                // ORDER SECTION
                $('.close-order-btn').click(()=>{
                    console.log('wrerrerkx')
                    $('.single-order-form-overlay .result').empty()
                    $('.single-order-form-overlay').removeClass('active')
                

                });
                // set the values to be edited
                console.log(order.extras)
                order.extras.forEach((item)=>{
                    let concernedTr = document.querySelector(`.single-order-form-overlay .result tr[data-name=${item.itemName.toLowerCase()}]`)
                    concernedTr.children[2].firstElementChild.value = item.itemQty;
                    concernedTr.children[3].firstElementChild.innerText = item.amntToBeAdded;
                    console.log(concernedTr)

                })
                // set the total price
                let totalOrderPriceElement = document.querySelector('.totalPrice')
                totalOrderPriceElement.innerText = order.totalPrice;
                // cange add to cart to save
                $('.single-order-form-overlay .result .add-to-cart').text('Save')
                
                
                const autoCalculator = ()=>{

                    let basePriceElement = document.querySelector('.base-price');
                    let orderTitleElement = document.querySelector('.order-title')
                    let order = {
                        name: orderTitleElement.innerText,
                        totalPrice: Number(basePriceElement.innerText),
                        extras:[],
                        re: 'was',
                        orderFile
                        
                    };



                    





                    let totalOrderPriceElement = document.querySelector('.totalPrice')
                    let allInputs = document.querySelectorAll('.single-order-form .form-control');
                    for (const input of allInputs) {
                        let itemName = input.parentElement.parentElement.firstElementChild.innerText;
                        let itemRate = Number(input.parentElement.previousElementSibling.firstElementChild.innerText);
                        let itemQty =  Number(input.value);
                        let amntToBeAdded =  itemRate * itemQty;
                        totaItemPriceElement = input.parentElement.nextElementSibling.firstElementChild;
                        order.extras.push({
                            itemName,itemRate,itemQty,
                            amntToBeAdded,
                            
                        })

                        totaItemPriceElement.innerText = amntToBeAdded;

                        

                        
                    }
                    order.extras.forEach(item => order.totalPrice += item.amntToBeAdded)
                    totalOrderPriceElement.innerText = order.totalPrice;
                    console.log('ab',order)

                    localStorage.setItem('order',JSON.stringify(order))
                
                    

                }
                


                
                $('.single-order-form .form-control').change(()=>{
                    autoCalculator()
                    


                    
                })

                $('.add-to-cart').click((e)=>{
                    e.preventDefault();
                    let newOrder = JSON.parse(localStorage.getItem('order'));
                    let orders = JSON.parse(localStorage.getItem('orders'));
                    orders[choosenIndex] = newOrder;
                    localStorage.setItem('orders',JSON.stringify(orders))
                    setItemsInCart();
                    // close modal
                    $('.single-order-form-overlay .result').empty()
                    $('.single-order-form-overlay').removeClass('active')
                    showOrders()
                    console.log('orders',JSON.parse(localStorage.getItem('orders')))
                        

                })


                // end of ORDER SECTION
                
            })
            

    })
    console.log('ordeerBtns',orderBtns)
    
    console.log(document.querySelector('.list-group-item').getAttribute('data-key'))

    





})

// all orders made page