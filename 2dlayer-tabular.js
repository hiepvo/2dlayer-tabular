/**
 * Created by hiepvo on 3/29/17.
 */

(function(){
  'use strict';
  var init         = {};
  var maxHeight    = 720;
  var links        = document.querySelectorAll('.layer header');
  var close_links  = document.querySelectorAll('.layer .close');
  var hidden_layer = document.querySelector('#hidden_layer');

  for(var i = 0; i < close_links.length; i++){
    links[i].addEventListener('click', openSlide, false);
    close_links[i].addEventListener('click', closeBtn, false);
  }

  // restore height of element and remove class 'active'
  function closeSlide(el){
    el.style.maxHeight                     = 50 + 'px';
    el.style.transitionDuration            = '1.5s';
    el.parentNode.style.width              = 25 + 'rem';
    el.parentNode.style.transitionDuration = '0.5s';
    var close                              = document.querySelector('#' + el.parentNode.id + ' span.close');
    var description =  document.querySelector('#' + el.parentNode.id + ' div.description');
    var article =  document.querySelector('#' + el.parentNode.id + ' div.description~article');
    description.style.opacity = 0;
    article.style.opacity = 0;

    setTimeout(function(){
      removeClass(el, 'active');
      addClass(el.parentNode, 'visited');
    }, 750);

    hide(close, 500);
  }

  function closeBtn(el){
    if(this.tagName.toLowerCase() === 'span'){
      var el                                 = this.parentNode;
      var description =  document.querySelector('#' + el.parentNode.id + ' div.description');
      var article =  document.querySelector('#' + el.parentNode.id + ' div.description~article');
      description.style.opacity = 0;
      article.style.opacity = 0;

      el.style.maxHeight                     = 50 + 'px';
      el.style.transitionDuration            = '1.5s';
      el.parentNode.style.width              = 25 + 'rem';
      el.parentNode.style.transitionDuration = '.5s';

      setTimeout(function(){
        removeClass(el, 'active');
        removeClass(hidden_layer, 'visible');
        addClass(el.parentNode, 'visited');
        el.parentNode.style.top  = hidden_layer.offsetTop + 'px';
        el.parentNode.style.left = hidden_layer.offsetLeft + 'px';
        hidden_layer.style.top   = el.parentNode.offsetTop + 'px';
        hidden_layer.style.left  = el.parentNode.offsetLeft + 'px';
        temp                     = null;
      }, 750);
      var close = document.querySelector('#' + el.parentNode.id + ' span.close');
      hide(close, 500);
    }
  }

  var temp       = null;
  var inProgress = false;

  function openSlide(e){
    if(inProgress === true || inProgress === undefined){
      return;
    }
    inProgress           = true;
    var currentEl        = this.parentNode.parentNode;
    var parent           = this.parentNode.parentNode.parentNode;
    var lastChild        = parent.lastElementChild;

    if(temp === null){
      temp = lastChild;
    }
    else{
      lastChild = temp;
    }
    if(currentEl.className.indexOf('on-top') === -1){
      addClass(currentEl, 'on-top');
    }
    var lastActive = document.querySelector('#' + lastChild.id + ' div');
    var content    = document.querySelector('#' + currentEl.id + ' div');
    var close      = document.querySelector('#' + currentEl.id + ' .close');

    var description =  document.querySelector('#' + currentEl.id + ' div.description');
    var article =  document.querySelector('#' + currentEl.id + ' div.description~article');

    removeClass(close, 'hide');
    removeClass(content.parentNode, 'visited');
    if(lastActive.className.indexOf('active') !== -1){
      closeSlide(lastActive);

      setTimeout(function(){
        lastChild.style.top     = hidden_layer.offsetTop + 'px';
        lastChild.style.left    = hidden_layer.offsetLeft + 'px';
        hidden_layer.style.top  = lastChild.offsetTop + 'px';
        hidden_layer.style.left = lastChild.offsetLeft + 'px';

        currentEl.style.top     = lastChild.offsetTop + 'px';
        currentEl.style.left    = lastChild.offsetLeft + 'px';
        hidden_layer.style.top  = currentEl.offsetTop + 'px';
        hidden_layer.style.left = currentEl.offsetLeft + 'px';

      }, 750);

      if(lastChild.offsetTop !== currentEl.offsetTop){
        addClass(content, 'active');

        setTimeout(function(){
          addClass(hidden_layer, 'visible');
          var aDiv                      = document.getElementsByClassName('active')[0];
          aDiv.style.transitionDuration = '2.5s';
          content.style.maxHeight       = maxHeight + 'px';
          content.style.transitionDuration = '0.75s';

          currentEl.style.width         = '100%';
          currentEl.style.transitionDuration = '0.75s';
          inProgress                    = false;

          article.style.opacity = 1;
          description.style.opacity = 1;
          article.style.transitionDelay = '.2s';
          description.style.transitionDelay = '.2s';

        }, 1500);
      }
    }
    else{
      lastChild.style.top  = currentEl.offsetTop + 'px';
      lastChild.style.left = currentEl.offsetLeft + 'px';

      currentEl.style.top  = lastChild.offsetTop + 'px';
      currentEl.style.left = lastChild.offsetLeft + 'px';
      addClass(lastChild, 'top-layer');
      addClass(content, 'active');
      addClass(hidden_layer, 'visited');

      var aDiv                      = document.getElementsByClassName('active')[0];
      aDiv.style.transitionDuration = '2.5s';

      addClass(hidden_layer, 'visible');
      setTimeout(function(){
        content.style.maxHeight = maxHeight + 'px';
        content.style.transitionDuration = '.75s';
        currentEl.style.width   = '100%';
        currentEl.style.transitionDuration   = '.75s';
        article.style.opacity = 1;
        description.style.opacity = 1;
        article.style.transitionDelay = '.2s';
        description.style.transitionDelay = '.2s';
        inProgress              = false;
      }, 700);
    }
    setTimeout(function(){
      removeClass(currentEl, 'on-top');
    }, 2000);
    temp = currentEl;
  }

  /********* helper ***********/
  function hide(el, time){
    setTimeout(function(){
      addClass(el, 'hide');
    }, time);
  }

  function show(el, time){
    setTimeout(function(){
      removeClass(el, 'hide');
    }, time);
  }

  function hasClass(el, className){
    if(el.classList)
      return el.classList.contains(className);
    else
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }

  function addClass(el, className){
    if(el.classList)
      el.classList.add(className);
    else if(!hasClass(el, className)) el.className += " " + className
  }

  function removeClass(el, className){
    if(el.classList)
      el.classList.remove(className);
    else if(hasClass(el, className)){
      var reg      = new RegExp('(\\s|^)' + className + '(\\s|$)');
      el.className = el.className.replace(reg, ' ')
    }
  }

  /*-------------------------------*/

  window.init = init;

})
(window);

