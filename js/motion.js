/* Progressive enhancement only: the portfolio remains readable without JS. */
(function(){
  "use strict";
  var root=document.documentElement;
  var reduced=window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var progress=document.querySelector(".motion-progress");
  var rafPending=false;
  function updateProgress(){
    rafPending=false;
    if(!progress)return;
    var max=document.documentElement.scrollHeight-window.innerHeight;
    var ratio=max>0?Math.max(0,Math.min(1,window.scrollY/max)):0;
    progress.style.transform="scaleX("+ratio.toFixed(4)+")";
  }
  if(progress&&!reduced){
    function requestProgress(){
      if(!rafPending){rafPending=true;window.requestAnimationFrame(updateProgress);}
    }
    window.addEventListener("scroll",requestProgress,{passive:true});
    window.addEventListener("resize",requestProgress,{passive:true});
    updateProgress();
  }
  if(reduced)return;
  var fine=window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if(fine){
    var hero=document.querySelector(".hero");
    if(hero){
      var heroPending=false,heroX=76,heroY=43;
      hero.addEventListener("pointermove",function(event){
        var box=hero.getBoundingClientRect();
        heroX=(event.clientX-box.left)/box.width*100;
        heroY=(event.clientY-box.top)/box.height*100;
        if(!heroPending){
          heroPending=true;
          window.requestAnimationFrame(function(){
            hero.style.setProperty("--spot-x",heroX.toFixed(1)+"%");
            hero.style.setProperty("--spot-y",heroY.toFixed(1)+"%");
            heroPending=false;
          });
        }
      },{passive:true});
    }
    document.querySelectorAll(".project,.skill-card").forEach(function(card){
      card.addEventListener("pointermove",function(event){
        var rect=card.getBoundingClientRect();
        card.style.setProperty("--card-x",((event.clientX-rect.left)/rect.width*100).toFixed(1)+"%");
        card.style.setProperty("--card-y",((event.clientY-rect.top)/rect.height*100).toFixed(1)+"%");
      },{passive:true});
    });
  }
  if(!("IntersectionObserver" in window))return;
  var selectors=".section-head,.project,.skill-card,.award-card,.about-grid > *,.journey-grid > *,.contact-panel,.timeline > article";
  var items=Array.prototype.slice.call(document.querySelectorAll(selectors));
  items.forEach(function(item,index){
    item.classList.add("reveal-on-scroll");
    var parent=item.parentElement;
    if(parent && (parent.classList.contains("project-grid")||parent.classList.contains("skills-grid")||parent.classList.contains("awards-grid"))){
      var siblings=Array.prototype.slice.call(parent.children);
      item.style.setProperty("--reveal-delay",Math.min(siblings.indexOf(item)%3*90,180)+"ms");
    }
  });
  root.classList.add("motion-ready");
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.07,rootMargin:"0px 0px -25px 0px"});
  items.forEach(function(item){observer.observe(item);});
})();