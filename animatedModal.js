/*=========================================
 * animatedModal.js: Version 1.0
 * author: João Pereira
 * website: http://www.joaopereira.pt
 * email: joaopereirawd@gmail.com
 * Licensed MIT 
=========================================*/

(function ($) {
 
    $.fn.animatedModal = function(options) {
        var me = this;
        var modal = $(this);
        
        //Defaults
        var settings = $.extend({
            modalTarget:'animatedModal', 
            position:'fixed', 
            width:'100%', 
            height:'100%', 
            top:'0px', 
            left:'0px', 
            zIndexIn: '9999',  
            zIndexOut: '-9999',  
            color: '#39BEB9', 
            opacityIn:'1',  
            opacityOut:'0', 
            animatedIn:'zoomIn',
            animatedOut:'zoomOut',
            animationDuration:'.6s', 
            overflow:'auto', 
            // Callbacks
            beforeOpen: function(event, callback) {
                callback();
            },           
            afterOpen: function() {}, 
            beforeClose: function() {}, 
            afterClose: function() {}
 
        }, options);

        me.openModal = function(){
            settings.beforeOpen(event, function(){
                $('body, html').css({'overflow':'hidden'});
                if (id.hasClass(settings.modalTarget+'-off')) {
                    id.removeClass(settings.animatedOut);
                    id.removeClass(settings.modalTarget+'-off');
                    id.addClass(settings.modalTarget+'-on');
                } 

                 if (id.hasClass(settings.modalTarget+'-on')) {
                    id.css({'opacity':settings.opacityIn,'z-index':settings.zIndexIn});
                    id.addClass(settings.animatedIn);  
                    id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(event){
                        afterOpen(event);
                    });
                };
            });
        }

        me.closeModal = function(){
            $('body, html').css({'overflow':'initial'});
            
            if (id.hasClass(settings.modalTarget+'-on')) {
                id.removeClass(settings.modalTarget+'-on');
                id.addClass(settings.modalTarget+'-off');
            }; 

            if (id.hasClass(settings.modalTarget+'-off')) {
                id.removeClass(settings.animatedIn);
                id.addClass(settings.animatedOut);
                id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(event){
                    afterClose(event);
                });
            };
        }
        
        var closeBt = $('.close-'+settings.modalTarget);

        var href = $(modal).attr('href'),
            id = $('body').find('#'+settings.modalTarget),
            idConc = '#'+id.attr('id');

            // Default Classes
            id.addClass('animated');
            id.addClass(settings.modalTarget+'-off');

        //Init styles
        var initStyles = {
            'position':settings.position,
            'width':settings.width,
            'height':settings.height,
            'top':settings.top,
            'left':settings.left,
            'background-color':settings.color,
            'overflow-y':settings.overflow,
            'z-index':settings.zIndexOut,
            'opacity':settings.opacityOut,
            '-webkit-animation-duration':settings.animationDuration,
            '-moz-animation-duration':settings.animationDuration,
            '-ms-animation-duration':settings.animationDuration,
            'animation-duration':settings.animationDuration
        };

        //Apply stles
        id.css(initStyles);

        modal.click(function(event) {       
            event.preventDefault();
            me.openModal();
        });

        // update so dynamically created close buttons have click handlers
        $('body').on('click', '.close-'+settings.modalTarget, function(event){
            event.preventDefault();

            settings.beforeClose(event); //beforeClose

            me.closeModal();
        });

        function afterClose (event) {
            // make sure it's really the modal that is triggering the close event
            if (event.target === event.currentTarget) {
                id.css({'z-index':settings.zIndexOut});
                settings.afterClose(event); //afterClose
            }
        }

        function afterOpen (event) {       
            settings.afterOpen(event); //afterOpen
        }

        // it is customary to return "this", but I assigned "this" to "me"
        return me;

    }; // End animatedModal.js

}(jQuery));



        
