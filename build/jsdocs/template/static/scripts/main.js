$(function () {
    $('.navigationDiv').load("nav.html .main-sidebar", null, function () {
        // Search Items
        $('#searchBox').on('keyup', function (e) {

            var term = $('#searchBox').val().trim();
            var li = $('.sidebar-menu').find('li');
            if (term.length === 0) {
                li.each(function () {
                    var el=$(this);
                    el.show(0);
                    el.removeClass('active');
                    if (el.data('lte.pushmenu.active')) {
                        el.addClass('active');
                    }
                });
                return;
            }
            var regexp = new RegExp(term, 'i');
            
            li.hide();
            li.removeClass('pushmenu-search-found', false);
            li.removeClass('active');
            console.log("!!!!!!!!!!!!!");
            var start = new Date();
            li.each(function () {
                var el=$(this);
                if (el.text() && regexp.test(el.text())) {
                    el.show();
                    el.addClass('pushmenu-search-found');

                    if (el.is('.treeview')) {
                        el.addClass('active');
                    }

                    var parent =el.parents('li').first();
                    if (parent.is('.treeview')) {
                        parent.show();
                    }

                }
                if (el.is('.header')) {
                    el.show();
                }

            });
            console.log(new Date() - start);

            $('.sidebar-menu li.pushmenu-search-found.treeview').each(function () {
                var el=$(this);
                el.find('.pushmenu-search-found').show();
                el.find('.pushmenu-search-found').closest('.itemMembers').show();
            });


        });

        // Toggle when click an item element
        $('.main-sidebar').on('click', '.title', function (e) {
            $(this).parent().find('.itemMembers').toggle();
        });
        // // Show an item related a current documentation automatically
        debugger
        var filename = $('.page-title').data('filename').replace(/\.[a-z]+$/, '');
        var $currentItem = $('.main-sidebar .item[data-name="' + filename + '"]:eq(0)');

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