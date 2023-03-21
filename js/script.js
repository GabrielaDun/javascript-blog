'use strict';
{
  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list', /* lista tagow*/
  optAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';
  

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


const generateTitleLinks = function (customSelector = ''){

  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [PRABOBLY DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for(let article of articles){
  
    /* [PRABOBLY DONE] get the article id */
      const articleId = article.getAttribute('id');

        /* [DONE]  find the title element and get the title from the title element*/
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* insert link into titleList */
      titleList.innerHTML = titleList.innerHTML + linkHTML;
    }

    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  
}
generateTitleLinks();

const calculateTagsParams = function(tags){
  const params = { max: 0, min: 99999};
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
    console.log(params)
  }
  return params
};
calculateTagsParams();

const calculateTagClass = function (count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber
}



/* Adding tags to articles and right column*/

const generateTags = function(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    let tagWrapp = article.querySelector(optArticleTagsSelector);
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
        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      /* add generated code to html variable */
      tagWrapp.insertAdjacentHTML("afterbegin",linkHTML)
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;    
      } else {
        allTags [tag]++;
      }
    /* END LOOP: for each tag */
      }
    /* insert HTML of all the links into the tags wrapper */
      
  /* END LOOP: for every article: */
  }
    /* [NEW] find list of tags in right column */
   const tagList = document.querySelector(optTagsListSelector);

     /* Finding the extreme numbers */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"><span>' + tag  + '</span></a></li>';
      console.log('tagLinkHTML:', tagLinkHTML);
      /*allTagsHTML += '<li><a class="" href="#tag-' + tag + '"><span>' + tag + ' ('+ allTags[tag] + ') ' + '</span></a></li>'; */
      allTagsHTML += tagLinkHTML;
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
}


/* Adding an event after clicking a tag*/
generateTags();

const tagClickHandler = function (event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href')
  console.log(href)
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('.active[href^="#tag-"]')

  /* START LOOP: for each active tag link */
    for(let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
    }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const matchingTags = document.querySelectorAll(href);
  /* START LOOP: for each found tag link */
    for (let matchingTag of matchingTags){
      /* add class active */
      matchingTag.classList.add('active');
  /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');


}

const addClickListenersToTags = function(){
  /* find all links to tags */
  const links =  document.querySelectorAll('a[href^="#tag-"]');
  console.log(links)
  /* START LOOP: for each link */
    for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}
addClickListenersToTags();


/* [DONE Adding authors to articles */


const generateAuthor = function(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    let authorWrapp = article.querySelector(optAuthorSelector);
    /* get tags (author) from data-tags attribute */
    const articleAuthor = article.getAttribute('data-author')
    const authorNameAndSurname = articleAuthor.split('-')
    const authorName = authorNameAndSurname[0];
    const authorSurname = authorNameAndSurname[1];
    const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + 'by ' + authorName +' '+ authorSurname + '</span></a>';
      /* add generated code to html variable */
      authorWrapp.insertAdjacentHTML("afterbegin",linkHTML)
    /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
  }
  /* END LOOP: for every article: */
}
generateAuthor();

/* Adding an event after clicking a tag */

const authorClickHandler = function (event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href')
  console.log(href)
  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('.active[href^="#author-"]')
  console.log(activeTags);
  /* START LOOP: for each active tag link */
    for(let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
    }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const matchingTags = document.querySelectorAll(author);
  console.log(matchingTags);
  /* START LOOP: for each found tag link */
    for (let matchingTag of matchingTags){
      /* add class active */
      matchingTag.classList.add('active');
  /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');


}

const addClickListenersToAuthor = function(){
  /* find all links to tags */
  const links =  document.querySelectorAll('a[href^="#author-"]');
  console.log(links)
  /* START LOOP: for each link */
    for(let link of links){
    /* add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  }
  /* END LOOP: for each link */
}
addClickListenersToAuthor();



}