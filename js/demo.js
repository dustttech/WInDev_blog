document.addEventListener('DOMContentLoaded',function(){
    var mainbody = document.querySelector('body');
    var post_wrapper = document.querySelectorAll('.post-wrapper');
    console.log(post_wrapper);
    var main_content = document.querySelector('.main-wrapper');
    var preload = document.querySelector('.preload-wrapper');
    
    main_content.style.opacity = "0";

    window.addEventListener('load', function () {
        setTimeout(() => {

            preload.style.opacity = "0";
            preload.style.zIndex = "-1";

            main_content.style.opacity = "1";
            post_wrapper.forEach(element => {
                element.classList.add('show__item');
            });
        }, 1000);
        
    })

    // SCROLL TO TOP
    var scrollToTop = document.querySelector('.backtotop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 700) {
            scrollToTop.classList.add('backtotopActive');
        } else {
            scrollToTop.classList.remove('backtotopActive');
        }
    })
    
    // NAV/SEARCH MENU
        // TRIGGER
    var trigger_navmenu = document.querySelector('.header__trigger-menu'),
        close_menu = document.querySelectorAll('.close'),
        // NAV MENU
        navmenu = document.querySelector('.header__nav-bar'),
        menu_link = document.querySelectorAll('.header__nav-bar li a'),//Link a
        menu_list = document.querySelectorAll('.header__nav-bar li'),//list li
        navmenu_submenu = document.querySelectorAll('.dropdownMenu-collapsed'), //submenu wrapper
        // SEARCH
        trigger_search = document.querySelector('.fa-search'), //icon scope
        search_menu = document.querySelector('.header__search'), // search menu
        search_field = document.querySelector('.search__area input'); // input search field


        window.addEventListener('resize', function () {
            if (window.innerWidth > 800) {
                mainbody.classList.remove('hide-scrollbar');
                navmenu.classList.remove('active');
            }
        })
        // TRIGGER 
    trigger_navmenu.onclick = function () {
        navmenu.classList.add('active');
        mainbody.classList.toggle('hide-scrollbar');
    };
    trigger_search.addEventListener('click', function (event) {
        event.preventDefault();
        search_menu.classList.add('active');
        mainbody.classList.toggle('hide-scrollbar');
        setTimeout(() => { //need delay for focus to work 
            search_field.focus();//focus input
        }, 500);
    })
        //2 CLOSE NAV MENU/SEARCH POPUP
        for (let i = 0; i < close_menu.length; i++) {
            close_menu[i].addEventListener('click', function () {
                navmenu.classList.remove('active');
                search_menu.classList.remove('active');
                mainbody.classList.toggle('hide-scrollbar');
            })
        }

    // CLICK ANIMATION
    // ALL LINK A ARRAY
    for (let i = 0; i < menu_link.length; i++) {
        menu_link[i].addEventListener('click',function () {
            // CHECK CLASS OF CLICK ELEMENT (GET ARRAY)
            var list_type = menu_list[i].classList,
                icon_rotate = document.querySelectorAll('.dropdown > a'),//STYLE FOR ICON
                // FOR DROPDOWN ONLY , TO GET SUBMENU WRAPPER
                next_item = this.nextElementSibling;
            // First click in dropdown (because initial it only have 1 dropdown class , haven't add active class in (line 59 was not executed yet) -> list_type lenght = 1)
            if (list_type.length == 1 && list_type[0] == "dropdown") {
                // LOOP for toggle state when click in another dropdown element 
                for (let j = 0; j < navmenu_submenu.length; j++) {
                    navmenu_submenu[j].classList.add('collapsed');
                    icon_rotate[j].classList.remove('rotate');
                }
                // show submenu 
                next_item.classList.remove('collapsed');
                // style for a:after
                this.classList.add('rotate');
            } 
            // keep clicking same dropdown , unlike the first if , the second you click 2 the same dropdown element , it already have dropdown and active in it (line 59 was already executed) , so the code will loop in here if user keep spamming
            else if (list_type.length == 2 && list_type[0] == "dropdown") {
                // toggle in stead
                next_item.classList.toggle('collapsed');
                this.classList.toggle('rotate');
            } else if (list_type.length == 0) {
                // add collapsed when suddenly click to non-dropdown list item
                for (let j = 0; j < navmenu_submenu.length; j++) {
                    navmenu_submenu[j].classList.add('collapsed');
                    icon_rotate[j].classList.remove('rotate');
                }
            }
            // remove all active in li first (to change "a" color)
        for (let k = 0; k < menu_list.length; k++) {
            menu_list[k].classList.remove('active');
        }
        // add active vào click item
        menu_list[i].classList.add('active');
        })
    }

   
    // LOAD WHEN SCROLL INTO VIEW ANIMATION
    var post_article = document.querySelectorAll('.content__post'); // get all the post article
    var pos_arr = []; // array to store the location of all the post article
    // ADD active class for all the post that sit nearest to the top of the page (so the page don't look empty when load )
    window.onload = function () { // 
        for (let i = 0; i < post_article.length; i++) {  
            var pos_post = post_article[i].offsetTop; // get the position of all the post 
            pos_arr.push(pos_post); // push them in pos_arr
        }
        var first_post = findmin(pos_arr);  //find the one which is nearest to the top ( max 4 post ) by call findmin function (line 105) which return a array of all the index of those post
        for (let i = 0; i < first_post.length; i++) {
            post_article[first_post[i]].classList.add('active'); // add active class to all those post .
        }
    }
        //  Add active class for post article when user scroll them into view 
    for (let i = 0; i < post_article.length; i++) {  
        window.addEventListener('scroll',function () { // add event listener for scroll for all the article post 
            var pos_post = post_article[i].offsetTop, //  get the position of post ( call PP )
                pos = window.pageYOffset; // get the position of the window scroll bar 
            if (pos > (pos_post - 700)) { // if scroll to PP - 700 px -> show post article (add active)
                post_article[i].classList.add('active');
            }
        })
    }
    // Function to find the nearest one to the top 
    function findmin(array) { // need to pass a array
        var index_arr = [],  // declare a store arr 
            minvalue = 10000;  // set the initial min  value (just need it to be bigger than all the item in the pos arr)
        for (let j = 0; j < array.length; j++) { // tolerate through the arr
            if (array[j] <= minvalue) {  // if the arr item smaller or equal to the minvalue
                minvalue = array[j]; // set minvalue = that item
                index_arr.push(j); // push the index of that item to the store arr 
            } // this work because the first item always is the nearest ( because structure in html ) , i code base on the thought that because i've already know what in the pos_arr . this code WILL ONLY work for this pos arr 
        }
        return index_arr; //return the array which include the index of all the nearst post 
    }




        


     // CONTENT POST
    var wrapper = document.querySelectorAll('.post-slideWrapper'); //Get all the gallery post 
        for (let i = 0; i < wrapper.length; i++) {
            slideShow(wrapper[i]); //add slide effect for each one .
        }
        function slideShow(wrapper) { //function for slide effect 
            var slide_wrapper = wrapper.querySelector('.post-slide'),        // get slide (ul)
                bullet_wrapper = wrapper.querySelector('.post-slideOrder'),  // get bullet of slide (ul) 
                cur_pos = 0,        // initial active position
                isAnimation = false;  // var for prevent spamming click

            slide_wrapper.addEventListener('click',function () {   // wait for click event 
                slide_child = this.children;    // ul child (all li)
                bullet_child = bullet_wrapper.children; // same

                if (isAnimation) { // just prevent spam click thing
                    return false;
                }
                isAnimation = true;

            slide_child[cur_pos].classList.remove('active');  // remove active in the current active li
            bullet_child[cur_pos].classList.remove('active'); 
            if (cur_pos < slide_child.length - 1) {  
                cur_pos++;  // increase the current position by 1
            } else {
                cur_pos = 0;   // when reach 2 turn back to 0
            }
            slide_child[cur_pos].classList.add('active');  //add active for the current position (+1)
            bullet_child[cur_pos].classList.add('active');
    
    
            setTimeout(() => { // just prevent spam click thing
                isAnimation = false;
            }, 800); // wait 0.8s for the next event can occur
            })
        }

// VIDEO POST 
var videoThumbnail = document.querySelectorAll('.post-videoThumbnail');
        
    video_wrapper = document.querySelectorAll('.post-video'),
    videoclip = document.querySelectorAll('.post-video video'),
    close_video = document.querySelectorAll('.post-video .close-video');
    for (let i = 0; i < videoThumbnail.length; i++) {
        videoThumbnail[i].addEventListener('click',function () {
            video_wrapper[i].classList.add('active'); 
            mainbody.classList.toggle('hide-scrollbar');
        })
        close_video[i].addEventListener('click',function () {
            video_wrapper[i].classList.remove('active');
            videoclip[i].pause(); // prevent the video keep playing when go into hidden state (just in case)
            mainbody.classList.toggle('hide-scrollbar'); // over flow for body , to make the video player look more " clean "
        })
    }
    

    




},false)
