
var appendJs = function(el,src){
    var script = document.createElement('script')
    script.src = src;
    el.append(script);
};

function Formathtmljscss(target_el,type){
    var target_src = target_el.html();
    if(formathtmljscss){
    var formatStr = new formathtmljscss(target_src,4,type).getOutput();
    return formatStr
  }
}


/**

* 格式化文本为html标签

* contentId，需进行格式转换的元素ID

**/

function formatText(contentId) {

    var code = $('<div class="format-code"></div>')
    var content = $('#' + contentId);

    content.each(function() {

        var txt = $(this).text();

        //多个空格变成单个空格显示，所以需替换空格为 

        txt = txt.replace(new RegExp(' ', 'g'), ' ');

        txt = txt.replace(/\\/g,`<span style='display:none;'>""</span>`); 
        
        var j = 0;
        var div = document.createElement("div");

        for (i = 0; i<txt.length;i++){

            if (txt.charAt(i) == '\n') {

                //以换行符做分割

                // 把< ,div,</ > 用span包裹

                var partTxt = txt.slice(j, i);
                   
                var p = document.createElement("p");

                p.innerHTML = partTxt; //放入p标签里

                div.append(p);

                //由于p标签内容为空时，页面不显示空行，加一个

                if (partTxt == '') {

                    div.appendChild(document.createElement("br")); //加一个空格

                }

                j = i + 1;

            }

        }

        var p_end = document.createElement("p");

        p_end.innerHTML = txt.slice(j);

        div.appendChild(p_end);

        $(code).append(div);

    });
    return code.html();

}
