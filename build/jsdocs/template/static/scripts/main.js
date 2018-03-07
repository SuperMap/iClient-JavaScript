$(function () {
    $('.navigationDiv').load("nav.html .main-sidebar", null, function () {
        var height = $('.sidebar').height();
        $('.main-sidebar #categories').css('height', height - 50 + 'px');
        // Search Items
        $('#searchBox').on('keyup', function (e) {

            var term = $('#searchBox').val().trim();
            var li = $('.sidebar-menu').find('li');
            if (term.length === 0) {
                li.each(function () {
                    var el = $(this);
                    el.css("display", "block");
                    el.removeClass('active');
                });
                $('.sidebar-menu').find('.itemMembers').hide();
                return;
            }
            var regexp = new RegExp(term, 'i');

            li.hide();
            li.removeClass('pushmenu-search-found', false);
            li.removeClass('active');
            li.each(function () {
                var el = $(this);
                if (el.text() && regexp.test(el.text())) {
                    el.css("display", "block");
                    el.addClass('pushmenu-search-found');

                    if (el.is('.treeview')) {
                        el.addClass('active');
                    }

                    var parent = el.parents('li').first();
                    if (parent.is('.treeview')) {
                        parent.show();
                    }
                    var parentUl = el.parents('ul').first();
                    if (parentUl.is('.treeview-menu')) {
                        parentUl.show();
                    }

                }
                if (el.is('.header')) {
                    el.show();
                }

            });

            $('.sidebar-menu li.pushmenu-search-found.treeview').each(function () {
                var el = $(this);
                el.find('.pushmenu-search-found').show();
                el.find('.pushmenu-search-found').closest('.itemMembers').show();
            });


        });

        // Toggle when click an item element
        $('.main-sidebar').on('click', '.title', function (e) {
            $(this).parent().find('.itemMembers').toggle();
        });
        // // Show an item related a current documentation automatically
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


        $('a[href^="http"]').each(function () {
            $(this).attr('target', "_blank");
        })

    });
});