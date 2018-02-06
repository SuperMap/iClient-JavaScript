$(function () {
    $('.navigationDiv').load("nav.html .main-sidebar",null,function(){
        // Search Items
        $('#searchBox').on('keyup', function (e) {
            var term = $('#searchBox').val().trim();

            if (term.length === 0) {
                $('.sidebar-menu li').each(function () {
                    $(this).show(0);
                    $(this).removeClass('active');
                    if ($(this).data('lte.pushmenu.active')) {
                        $(this).addClass('active');
                    }
                });
                return;
            }

            $('.sidebar-menu li').each(function () {
                if ($(this).text().toLowerCase().indexOf(term.toLowerCase()) === -1) {
                    $(this).hide(0);
                    $(this).removeClass('pushmenu-search-found', false);

                    if ($(this).is('.treeview')) {
                        $(this).removeClass('active');
                    }
                } else {
                    $(this).show(0);
                    $(this).addClass('pushmenu-search-found');

                    if ($(this).is('.treeview')) {
                        $(this).addClass('active');
                    }

                    var parent = $(this).parents('li').first();
                    if (parent.is('.treeview')) {
                        parent.show(0);
                    }
                }

                if ($(this).is('.header')) {
                    $(this).show();
                }
            });

            $('.sidebar-menu li.pushmenu-search-found.treeview').each(function () {
                $(this).find('.pushmenu-search-found').show(0);
                $(this).find('.pushmenu-search-found').closest('.itemMembers').show(0);
            });
        });

        // Toggle when click an item element
        $('.main-sidebar').on('click', '.title', function (e) {
            $(this).parent().find('.itemMembers').toggle();
        });
        // // Show an item related a current documentation automatically
         var filename = $('.page-title').data('filename').replace(/\.[a-z]+$/, '');
         var $currentItem = $('.main-sidebar .item[data-name*="' + filename + '"]:eq(0)');

         if ($currentItem.length) {
            //$("section#sidebar #ul").addClass("active");
            $currentItem.parent('ul').parents('li.treeview').addClass("active");
            $currentItem.addClass("active");
            $currentItem.find('.itemMembers').show();
        //     $currentItem
        //         .remove()
        //         .prependTo('.navigation .list')
        //         .show()
        //         .find('.itemMembers')
        //         .show();
         }

        // Auto resizing on navigation
        var _onResize = function () {
            var height = $(window).height();
            var $el = $('.navigation');

            $el.height(height).find('.list').height(height - 120);
        };

        $(window).on('resize', _onResize);
        _onResize();
    });
});