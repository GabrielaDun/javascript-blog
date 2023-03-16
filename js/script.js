'use strict';
{
  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list'; /* lista tagow*/

  

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  const linksClicked = clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);
  console.log(linksClicked)

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

const articleSelector = clickedElement.getAttribute('href');
console.log(articleSelector)

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

const targetArticles= document.querySelector(articleSelector);
console.log(targetArticles)



  /* [DONE] add class 'active' to the correct article */
  targetArticles.classList.add('active');
  console.log('clickedElement:', clickedElement);
}



/* Generating list of titles */


const generateTitleLinks =function (){

  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [PRABOBLY DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){
  
    /* [PRABOBLY DONE] get the article id */
      const articleId = article.getAttribute('id');

        /* [DONE]  find the title element and get the title from the title element*/
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML)

      /* insert link into titleList */
      titleList.innerHTML = titleList.innerHTML + linkHTML;
    }

    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  
}
generateTitleLinks();



/* Adding tags to articles */



const generateTags= function(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const tagWrapp = article.querySelector(optArticleTagsSelector);
    console.log(tagWrapp);
    /* make html variable with empty string */
    let html = '';
    console.log(html)
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags')
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */
      let html = '<li><a href="#' + articleTags + '"><span>' + tag + '</span></a></li>';
      console.log(html)
      /* add generated code to html variable */
      }
    /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    tagWrapp.innerHTML = tagWrapp.innerHTML + html;
  }
  /* END LOOP: for every article: */
}

generateTags();
}

