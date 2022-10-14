// var header = {
//     pages:pages,
//     clickSearchItem() {
//         var _this = this;
//         var link_li = $('#result-list').find('li');
//         _this.clickItem(link_li);
//     },
//     clickItem(link_li){
//         var _this = this;
//         link_li.each(function () {
//             $(this).on('click',function(e){
//                 console.log('e---click');
//                 var href = e.currentTarget.dataset.href;
//                 var id = e.currentTarget.dataset.id;
//                 var type = e.currentTarget.dataset.type;
//                 var title = e.currentTarget.dataset.title;
//                 link_li.removeClass('on');
//                 if (href.indexOf(id) > -1) {
//                     $(this).addClass('on');
//                 }
//                 location.href = '/#' + href;
//                 _this.loadCode(href, title);
//                 _this.addHrefOn(href);

//             })
//         });
//         console.log(222);
//     },
//     init(){
//         this.clickSearchItem();
//     }
// }
// header.init();

// $('#result-list li').click(function(){
//     console.log($(this));
// })