$(document).ready(function () {
    console.log('herer')
    
    
    
    const setItemsInCart = ()=>{
        let badge = $('.items-in-cart');
        let noOfItems = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')).length : 0;
        badge.text(noOfItems);
        
    
    }
    setItemsInCart();
    
    let orderBtns = $('.food-item .btn')
    orderBtns.click((e)=>{
        e.preventDefault();
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
                let orders = localStorage.getItem('orders')?JSON.parse(localStorage.getItem('orders')):[];
                    
                localStorage.setItem('orders',JSON.stringify(orders))
                

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
                    orders.push(newOrder);
                    localStorage.setItem('orders',JSON.stringify(orders))
                    setItemsInCart();
                    // close modal
                    $('.single-order-form-overlay .result').empty()
                    $('.single-order-form-overlay').removeClass('active')
                    console.log('orders',JSON.parse(localStorage.getItem('orders')))
                        

                })


                // end of ORDER SECTION
                
            })
        console.log('i am',e.currentTarget)

    })
    console.log('ordeerBtns',orderBtns)


    


    window.addEventListener('scroll',()=>{
        if (window.scrollY > 20) {
            $('.my-header').addClass('fixed-header-container')
            
        } else {
            $('.my-header').removeClass('fixed-header-container')
            
        }
    })
    // testimonials sec
    let outerBtns = $('.outer');


   
    
    // for (let i = 0; i < outerBtns.length; i++) {
        
        
    //     outerBtns[i].addEventListener('click',function () {

    //         clearInterval(testimonilaLoop)
    //         showTestimonial(i);
    //         // when done activate loop again
    //         // testimonilaLoop()
           

           


            
    //     })
        
    // }
    // // first of all let 1 testimonial show before interval begins
    // showTestimonial(1)
    // let i = 0

    
    // let testimonilaLoop = setInterval(() => {

    //     showTestimonial(i)
    //     i++;

    //     if (i == 3) {

    //         i = 0;
            
    //     }
        
    // }, 5000);

   
    

    // function showTestimonial(i) {
    //     outerBtns.removeClass('active')
    //     outerBtns[i].classList.add('active')
    //     $(`.testimonial`).removeClass('active')
    //     $(`.testimonial`).css({
    //         opacity: 0
    //     })
            

    //     $(`.testimonial:nth-child(${i + 1})`).addClass('active')
    //     $(`.testimonial:nth-child(${i + 1})`).animate({
    //         opacity: 1
    //     })

        
    // }
    

    // // code to show promises
    // let promiseContent = $('.claim-content p')
    // $('#quality-food').click(function (e) {
    //     e.preventDefault()
    //     $('.assistive-element').removeClass('active')
    //     e.target.classList.add('active')
    //     promiseContent.fadeOut(500)
    //     // promiseContent.empty()
    //     promiseContent.html('You won’t find better tasting food anywhere! The Yellow Plate’s meals are all freshly prepared with love by the best Chefs in the city of Abuja')
    //     promiseContent.fadeIn(3000)
        
    // })
    // $('#customer-service').click(function (e) {
    //     e.preventDefault()
    //     $('.assistive-element').removeClass('active')
    //     e.target.classList.add('active')
    //     promiseContent.fadeOut(500)
    //     // promiseContent.empty()
    //     promiseContent.html('We ensure each experience is unique with maximum satisfaction guaranteed.')
    //     promiseContent.fadeIn(3000)
        
    // })
    // $('#fast-food').click(function (e) {
    //     e.preventDefault()
    //     $('.assistive-element').removeClass('active')
    //     e.target.classList.add('active')
    //     promiseContent.fadeOut(500)
    //     // promiseContent.empty()
    //     promiseContent.html(`We know you can’t wait to dig in, that’s why we make sure that your meals get delivered to your doorstep in minutes. Wherever you may be!
    //     We are the premier online food delivery service available 24-hours a day.`)
    //     promiseContent.fadeIn(3000)
        
    // })


    // code fo limit of items to display
    $('#limit-to-show').change(function (e) {
        let limit = e.target.value;
        let currentPrice = $('#price-range').val();
        console.log('currentPrice', currentPrice)
        console.log('limit',limit)
        filterNDisplayFoodItems(currentPrice,limit)

        
    })

    //  code to display based on price range
    $('#price-range').change(function (e) {

        let currentPrice = e.target.value;
        let limit = $('#limit-to-show').val()
        filterNDisplayFoodItems(currentPrice, limit)
        
    })

    function filterNDisplayFoodItems(currentPrice, limit = 10) {
        console.log('min',$('#price-range').attr('min'))
        console.log(currentPrice)
        $('.selectedFoods').empty()
        $.getJSON('food-items.json', function (data) {
            // first of filter  all incoming inputs
            let filteredArray = data.filter(function (food) {
                if (food.price <= currentPrice && food.price >= $('#price-range').attr('min')) {
                    return food;
                    
                }
                
            })
            console.log('filter', filteredArray)
            // then set a limit to the amount of results you want shown 
            filteredArray = filteredArray.splice(0,limit)
            console.log('filter after limit', filteredArray)
            $.map(filteredArray,function ({title,price,description,image}) {
                if (price <= currentPrice && price >= $('#price-range').attr('min')) {

                    $('.selectedFoods').append(
                        `
                        <div class="food-item">
                            <div class="picture" style="background-image: url('assets/${image || 'sandwich-2977251_1920.jpg'}');">
                                <div class="price">
                                    <span class="text-light">
                                        ₦${price} <sup class="text-light">.00</sup>
                                    </span>
                                </div>
                                <div class="like bg-light">i</div>
                                
                            </div>
                            <h6>${title} </h6>
                            <p>${description}</p>
                            <a href="#notInsertedFunctionYet" class="btn btn-secondary">Order Now</a>
                        </div>
                        
                        
                        
                        
                        
                        `
                    )
                    
                }
                
            })
            
        })

    }



    
    localStorage.setItem('position', 0);// start from o whenever refreshed
    
    $('#prev').click(function(e){// clean up this function
        e.preventDefault()

        localStorage.getItem('position')||localStorage.setItem('position', 0);

        
        let scrollable = $('.scrollable-items')
        
        let noOfItems = $('.scrollable-item').length
        let factorMultiplier = noOfItems/4;
        //console.log(noOfItems)
        let itemsWidth = scrollable.innerWidth() * (factorMultiplier/2); // there are 4 sets of 4 items each containing 4 items - l8r mk dynaimc by kn
        console.log('itemsWidth',itemsWidth)
        let itemWidth = $('.scrollable-item').innerWidth();
        console.log('item width',itemWidth)
        console.log('it works', itemsWidth/(itemWidth))
        console.log('Element', scrollable)

        let currentPosition = JSON.parse(localStorage.getItem('position'))
       
        console.log('position', currentPosition)
        if ((currentPosition !== 0 && currentPosition < itemsWidth) || currentPosition > itemsWidth) { // at 3 still works cos of not limit:. put at second to last

            // update the current position
            console.log('times',(4 * itemWidth))
            currentPosition = (currentPosition - (4 * itemWidth))

            scrollable.animate({
                left: -currentPosition
            })

           
            localStorage.setItem('position', currentPosition)
            console.log('position',localStorage.getItem('position'))

            

            
        }else if( currentPosition === 0){

           
            // be non actionable for now
            // scrollable.animate({
            //     left: '-3300px',
                
            // })
            
            


            

        }

        

        
    })
    $('#nxt').click(function(e){// clean up this function
        e.preventDefault()

        localStorage.getItem('position')||localStorage.setItem('position', 0);

        
        let scrollable = $('.scrollable-items')
        
        let noOfItems = $('.scrollable-item').length
        let factorMultiplier = noOfItems/4;
        //console.log(noOfItems)
        let itemsWidth = scrollable.innerWidth() * (factorMultiplier/2); // there are 4 sets of 4 items each containing 4 items - l8r mk dynaimc by kn
        console.log('itemsWidth',itemsWidth)
        let itemWidth = $('.scrollable-item').innerWidth();
        console.log('item width',itemWidth)
        console.log('it works', itemsWidth/(itemWidth))
        console.log('Element', scrollable)

        let currentPosition = JSON.parse(localStorage.getItem('position'))
        console.log('position', currentPosition)
        if (currentPosition <= itemsWidth) { // at 3 still works cos of not limit:. put at second to last

            // update the current position
            console.log('times',(4 * itemWidth))
            currentPosition = ((4 * itemWidth) + currentPosition)

            scrollable.animate({
                left: -currentPosition
            })

           
            localStorage.setItem('position', currentPosition)
            console.log('position',localStorage.getItem('position'))

            
        }else{

            localStorage.setItem('position', 0)
            scrollable.animate({
                left: 0
            })


            

        }

        

        
    })


    $('#right').click(function () {
        let items = $('.my-carousel-item').toArray()

        for (let i = 0; i < items.length; i++) {
            if (items[i].classList.contains('active')) {
                console.log('Active:',items[i])
                
                items[i].classList.remove('active')
                
                
                
                let nextItem = items[i].nextElementSibling !== null ? items[i].nextElementSibling : items[0];
                nextItem.classList.add('active');
                nextItem.style.left = '-4000px';
                nextItem = $('.my-carousel-item.active');
                
                nextItem.animate({
                    left: 0

                })
                console.log('REW',nextItem)
                break;
                
                // items[i+1].addClass('active')
                
            }
        
            
        }
    })
    $('#left').click(function () {
        let items = $('.my-carousel-item').toArray()
       
        for (let i = 0; i < items.length; i++) {
            
            if (items[i].classList.contains('active')) {
                console.log('Active:',items[i])
                
                items[i].classList.remove('active')
                
                
                
                let previousItem = items[i].previousElementSibling !== null ? items[i].previousElementSibling : items[items.length-1];
                
                previousItem.classList.add('active');
                console.log('b4',items[i])
                console.log('from DOM',previousItem)
                previousItem.style.left = '4000px';
                previousItem = $('.my-carousel-item.active') ;
                
                previousItem.animate({
                    left: 0

                })

                console.log('WER',previousItem)
                break;
                
                // items[i+1].addClass('active')
                
            }
        
            
        }
    })
    console.log('END')
    
    
})