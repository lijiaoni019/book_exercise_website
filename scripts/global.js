function addLoadEvent(func) {
    var oldonload = window.onload;
    if(typeof window.onload != "function"){
        window.onload = func
    } else {
        window.onload = function () {
            oldonload();
            func()
        }
    }
}

// 页面加载完毕时执行的函数创建为一个队列
// . 把现有的window.onload事件处理函数的值存入变量oldonload
// . 如果在这个处理函数上还没有绑定任何函数，就像平时那样把新函数添加给它；
// . 如果在这个处理函数上已经绑定了一些函数，就把新函数追加到现有指令的末尾；


function insertAfter (newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

// DOM 本身没有提供insertAfter方法

function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    }else{
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName
    }
}

// 再给一个元素追加新的class时：
// . 检查元素的className是否为null；
// . 如果是，把Value赋给的className；
// . 如果不是，把一个空格和新的class Value 追加到className属性上去；

function highlightPage(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    let header = document.getElementsByTagName("header")
    if(header.length==0) return false;
    let navs = header[0].getElementsByTagName("nav")
    if(navs.length==0) return false

    let links = navs[0].getElementsByTagName("a")
    for (let i=0; i<links.length; i++){
        let linkurl = links[i].getAttribute("href")
        if (window.location.href.indexOf(linkurl) != -1){
            links[i].className = "here"
            let linktext = links[i].lastChild.nodeValue.toLowerCase()
            document.body.setAttribute("id",linktext)
        }
    }
}

addLoadEvent(highlightPage);

// 1. 取得导航列表中所有链接；
// 2. 循环遍历这些链接；
// 3. 如果发现了于当前URL匹配的链接，为它添加here类；
// 先在函数中添加检查要使用的DOM方法的代码，此外还要检查各种元素是否存在

function moveElement (elementID, final_x, final_y,interval) {
    if (!document.getElementById) return false;
    // 检查方法是否存在
    if (!document.getElementById(elementID)) return false;
    // 检查元素是否存在
    let elem = document.getElementById(elementID);

    if(elem.movement){
        clearTimeout(elem.movement)
    }
    // 用clearTimeout 函数清楚积累在setTimeout队列里面的事件，消除动画滞后现象

    if (!elem.style.left){
        elem.style.left ="0px"
    };
    if(!elem.style.top){
        elem.style.top="0px"
    }   
    
    // 设定absolution position 初始值

    let xpos = parseInt(elem.style.left);
    let ypos = parseInt(elem.style.top);

    // 将string 转换成整数可以用parseInt
    // 将string 转换成带小数的可以用parseFloat

    if (xpos==final_x && ypos==final_y) {
        return true
    }

    // 到达终点则返回true并跳出函数

    if(xpos < final_x){
        let dis = Math.ceil((final_x-xpos)/10)
        xpos += dis;
    }

    if(xpos > final_x){
        let dis = Math.ceil((xpos - final_x)/10)
        xpos -= dis;
    }

    if(ypos < final_y) {
        let dis = Math.ceil((final_y-ypos)/10)
        ypos += dis; 
    }

    if(ypos > final_y){
        let dis = Math.ceil((ypos - final_y)/10)
        ypos -= dis;
    }

    // 根据距离决定移动速度，距离越大速度越快的动画效果
    // Math.ceil得到大于该数的最小整数
    // Math.floor得到小于该数的最大整数
    // Math.round 四舍五入得到整数

    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px" ;

    let repeat = function (){
        moveElement(elementID, final_x, final_y,interval)
    }

    elem.movement = setTimeout(repeat,interval)

    // 每隔interval时间重复执行moveElement函数
    // 并且将moveElement函数返回用一个变量movement表示，movement同时是elem的一个属性


}

function prepareSlideShow(){
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("intro")) return false;
    let intro = document.getElementById("intro");
    let slideShow = document.createElement("div");
    slideShow.setAttribute("id","slideShow");
    slideShow.setAttribute("style","border-radius: 10%;")
    let preview = document.createElement("img");
    preview.setAttribute("src","images/slideshow.PNG");
    preview.setAttribute("alt","a glimpse of what awaits you");
    preview.setAttribute ("id","preview");
    slideShow.appendChild(preview);
    insertAfter(slideShow,intro);

    let links = document.getElementsByTagName("a")
    for (let i =0; i<links.length; i++) {
         links[i].onmouseover = function () {
             let destination = this.getAttribute("href");
             if (destination.indexOf("index.html") != -1) {
                 moveElement ("preview",0,0,5)
             }

             if (destination.indexOf("about.html") != -1) {
                moveElement ("preview",-150,0,5)
            }

            if (destination.indexOf("photos.html") != -1) {
                moveElement ("preview",-300,0,5)
            }


            if (destination.indexOf("live.html") != -1) {
                moveElement ("preview",-450,0,5)
            }

            if (destination.indexOf("contact.html") != -1) {
                moveElement ("preview",-600,0,5)
            }

         }
    }

}

addLoadEvent(prepareSlideShow);

function showSection (id){
    let sections = document.getElementsByTagName("section")
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].getAttribute("id") != id) {
            sections[i].style.display="none"
        } else {
            sections[i].style.display="block"
        }
    }


}

function prepareInternalNav () {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    let articles = document.getElementsByTagName("article")
    if(articles.length==0) return false;
    let nav = articles[0].getElementsByTagName("nav")
    if (nav.length == 0) return false;
    let links = nav[0].getElementsByTagName("a")
    for (let i=0; i<links.length; i++) {
        let targetId = links[i].getAttribute("href").split("#")[1];
        if (!document.getElementById(targetId)) continue;
        //  一个简单测试，确保真的存在带有相应id的元素，如果不存在，则继续下一次循环
        document.getElementById(targetId).style.display = "none";
        // 加载页面后，默认隐藏所有部分
        links[i].destination = targetId;
        // 这里存在作用域的问题，因为变量targetId是一个局部变量，它只有在prepareInternalNav函数执行期间存在，等到了事件处理函数执行的时候就不存在了，要解决这个问题，可以为每个链接创建一个自定义属性
        links[i].onclick = function () {
            showSection(this.destination);
        }
        
        
    }

}

addLoadEvent(prepareInternalNav);


function preparePlaceholder (){
    if (!document.createElement) return false;
    if (!document.getElementById) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementsByTagName("imagegallery")) return false;

    let placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/photos/guitarist.jpg");
    placeholder.setAttribute("alt", "my image gallery");

    let description = document.createElement("p");
    description.setAttribute("id","description");
    let descriptionText = document.createTextNode("chose a picture");
    description.appendChild(descriptionText);

    let imagegallery = document.getElementById("imagegallery")
    insertAfter(description, imagegallery)
    insertAfter(placeholder,description)

}

function prepareGallery () {
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById("imagegallery")) return false;

    let imagegallery = document.getElementById("imagegallery");
    let links = imagegallery.getElementsByTagName("a");
    for (let i=0; i<links.length; i++){
        links[i].onclick = function (){

            for (let j=0; j<links.length; j++){
                let image = links[j].getElementsByTagName("img")[0]
                image.removeAttribute("class","imagefocus") 
            };

            let image = links[i].getElementsByTagName("img")[0];
            image.setAttribute("class","imagefocus") ;

            return showpic(this);

        }
    }
}

function showpic(whichpic){
  
    if(!document.getElementById) return false;
    if(!document.getElementById("placeholder")) return false;
    if (!document.getElementById("description")) return false;

    let source = whichpic.getAttribute("href");
    let placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
  

    let title

    if (whichpic.getAttribute("title")){
         title = whichpic.getAttribute("title");
    }else{
        title ="";
    }

    let description = document.getElementById("description");
    if(description.firstChild.nodeType==3){
        description.firstChild.nodeValue = title;
    }

    return false;
}


addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);






