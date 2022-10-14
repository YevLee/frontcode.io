var app = {
    el: $('#href-list'),
    pages: pages,
    theme:'yonce',
    site:'https://yevlee.github.io/frontcode.io',
    renderNav() {
        var _this = this;
        var pages = _this.pages;
        var el = $('#navbar');
        var title = '';
        for (var i in pages) {
            var list = pages[i].list;
            if (pages[i].list) {
                title = $(`<div class="list-title dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">${pages[i].name}<span class="caret"></span></div>`)
            } else {
                title = $(`<div class="list-title">${pages[i].name}</div>`)
            }
            _this.renderList(el, title, list, 'nav');
        };

        $('.navbar-toggle').click(function() {
            $("#navbar").slideToggle(100);
        })

        var link_li = $('#navbar').find('li');
        _this.clickItem(link_li);
    },
    renderAside() {
        var pages = this.pages;
        var el = this.el;
        for (var i in pages) {
            var title = $(`<div class="list-title">${pages[i].name}</div>`)
            var list = pages[i].list;
            this.renderList(el, title, list, 'aside');
        }
    },
    renderList(el, title, list, type_id) {
        var ul = ''
        if (type_id == 'search') {
            ul = $('<ul class="panel-body"></ul>');
        } else if (type_id == 'nav') {

            ul = $('<ul class="dropdown-menu"></ul>')
        } else {
            // aside
            el.append(title);
            ul = $('<ul></ul>');
        }

        for (var j in list) {
            // 渲染ul
            var item_title = list[j].title;
            var href = list[j].href;
            var id = list[j].id;
            var type = list[j].type;
            var li = '';
            if (type_id == 'search') {
                // console.log('type-search')
                // 搜索
                li = $(`<li data-title="${item_title}" data-href="${href}" data-type="${type}" data-id="${id}">
                <div class="title">${item_title}</div><span class="type">${type}</span>
                </li>`);
                ul.append(li);
                el.append(ul);
            } else if (type_id == 'nav') {
                // nav
                li = $(`<li data-title="${item_title}" data-href="${href}" data-type="${type}" data-id="${id}">
                    <div class="title">${item_title}</div></li>`);
                var dropdown = $('<div class="dropdown"></div>')
                ul.append(li);
                dropdown.append(title, ul);
                el.append(dropdown)
            } else {
                // aside
                li = $(`<li data-title="${item_title}" data-href="${href}" data-type="${type}" data-id="${id}"><p>${item_title}</p></li>`);
                ul.append(li);
                el.append(ul)
            }
        };
    },
    // https://codemirror.net/5/doc/manual.html
    formatHtml() {
        var _this = this;
        var pre = document.getElementById("pre");
        var editor = CodeMirror.fromTextArea(pre, {
            // mode: "text/html",
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true,
            theme:_this.theme
        });
    },
    keydownSubmit(event) {
        var _this = this;
        $('#search').keydown(function(e) {
            if (e.keyCode == 13) {
                _this.searchKey();
            };
        })
    },
    getPages(key) {
        var link_li = $('.left').find('li');
        var list = [];
        var type = ''
        $(link_li).each(function() {
            type = $(this).attr('data-type');
            var id = $(this).attr('data-id');
            var href = $(this).attr('data-href');
            var title = $(this).attr('data-title');
            if (title.indexOf(key) > -1) {
                list.push({
                    id,
                    href,
                    title,
                    type
                })
            }
        })
        return list;
    },
    searchKey() {
        var _this = this;
        $('#result-list').html('');
        var key = $('#search').val();
        var title = '';
        if (key == '') {
            return $('#result-list').html('关键词不能为空');
        }
        var list = _this.getPages(key);
        console.log('list--', list)
        _this.renderList($('#result-list'), title, list, 'search');
        $('#result-list').show();
        _this.clickSerachItem();
    },
    formSubmit() {
        var _this = this;

        $('#search').bind('input propertychange', function() {
            _this.searchKey();
        })
        $('#search-btn').click(function(e) {
            e.stopPropagation();
            $('#result-list').show();
            _this.searchKey();

        });
    },
    clickSerachItem() {
        var _this = this;
        var link_li = $('#result-list').find('li');
        _this.clickItem(link_li);

    },
    clickAsideItem() {
        var _this = this;
        var link_li = $('.left').find('li');
        _this.clickItem(link_li);
        link_li.eq(0).click();
    },
    clickItem(link_li) {
        var _this = this;
        link_li.each(function() {
            $(this).on('click', function(e) {
                var href = e.currentTarget.dataset.href;
                var id = e.currentTarget.dataset.id;
                var type = e.currentTarget.dataset.type;
                var title = e.currentTarget.dataset.title;
                link_li.removeClass('on');
                if (href.indexOf(id) > -1) {
                    $(this).addClass('on');
                }

                _this.loadCode(href, title);
                _this.addHrefOn(link_li);

                if ($('#navbar').is(':visible')) {
                    $('#navbar').hide();
                }
            })
        });

        $('body').click(function() {
            if ($('#result-list').is(':visible')) {
                $('#result-list').hide();
            }
        })
    },
    addHrefOn(link_li) {
        link_li.removeClass('on');
        link_li.each(function() {
            var datahref = $(this).attr('data-href');
            if (location.href.indexOf(datahref) > -1) {
                $(this).addClass('on');
            }
        })
    },
    loadCode(href, title) {
        var _this = this;
        if (href != 'undefined') {
            location.href = '#' + href;
            var site = _this.site==''?'':_this.site;
            $('#code-module').load(site+hreft, () => {
                $('#page-title').html(title);
                _this.formatHtml();
            });
        } else {
            $('#code-module').html('未找到页面')
        }

        var link_li = $('.left').find('li');
        _this.addHrefOn(link_li);
        var nav_li = $("#navbar").find('li');
        _this.addHrefOn(nav_li);
    },
    hashChange() {
        var _this = this;
        $(window).on('hashchange', function(e) {
            var pages = _this.pages;
            for (var i = 0; i < pages.length; i++) {
                var list = pages[i].list;
                for (var j = 0; j < list.length; j++) {
                    var href = list[j].href;
                    var title = list[j].title;
                    if (location.href.indexOf(href) > -1) {
                        _this.loadCode(href, title);
                    }
                }
            };

        })
    },
    winScroll() {
        var _this = this;
        $(window).scroll(function() {
            var scrollTop = $(this).scrollTop();
            if (scrollTop > 100) {
                $('#go-top').addClass('on')
            } else {
                $('#go-top').removeClass('on')
            }
        });
    },
    init: function() {
        this.renderNav();
        this.hashChange();
        this.renderAside();
        this.clickAsideItem();
        this.clickSerachItem();
        this.formSubmit();
        this.keydownSubmit();
        this.winScroll();

    }
};
app.init();
