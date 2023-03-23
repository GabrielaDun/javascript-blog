'use strict';
{

  const templates = {
    // eslint-disable-next-line no-undef
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
      // eslint-disable-next-line no-undef
    tagInArticleLink: Handlebars.compile(document.querySelector('#template-tag-in-article-link').innerHTML),
      // eslint-disable-next-line no-undef
    authorInArticleLink: Handlebars.compile(document.querySelector('#template-author-in-article-link').innerHTML),
      // eslint-disable-next-line no-undef
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    // eslint-disable-next-line no-undef
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
  }

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list', /* list of tags below the article*/
  optAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optAuthorListSelector = '.authors.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  const linksClicked = clickedElement.classList.add('active');
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


  /* [DONE] add class 'active' to the correct article */
  targetArticles.classList.add('active');
  console.log('clickedElement:', clickedElement);
}



/* Generating list of titles */


const generateTitleLinks = function (customSelector = ''){

  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for(let article of articles){
  
    /* [DONE] get the article id */
      const articleId = article.getAttribute('id');

        /* [DONE]  find the title element and get the title from the title element*/
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */

      /*const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; */

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
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
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
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
  /* [NEW] create a new object allTags that is empty */
  let allTags = {};
  /* find all articles becuase info about tags is inside the articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article - an individual article taken from a group of articles: */
  for(let article of articles){
    /* find tags wrapper - tag wrapp is a place where we want to add our tag links. It's below blog in 'tag' section*/
    let tagWrapp = article.querySelector(optArticleTagsSelector);
    /* get tags from data-tags attribute to be able to access them */
    const articleTags = article.getAttribute('data-tags')
    /* split tags into array so you can create links to each of them */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link  */
        /* const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>'; */
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagInArticleLink(linkHTMLData);

        /* add generated code to a tag Wrapp variable - so each link can be added to tag wrapp*/
        tagWrapp.insertAdjacentHTML("afterbegin",linkHTML)
        /* [NEW] check if this link is NOT already in allTags - jezeli allTag nie ma klucza tag. Czyli napelniamy obiekt allTags */
        if(!allTags[tag]){
          /* [NEW] add tag to allTags object. Here we are adding tag to all tags */
          allTags[tag] = 1;    
        } else {
          allTags [tag]++;
        }
    /* END LOOP: for each tag */
      }
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

     /* Finding the extreme numbers */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)

    /* [NEW] create variable for all links HTML code */
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      /*const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[/*tag], tagsParams) + '" href="#tag-' + tag + '"><span>' + tag  + '</span></a></li>'; */
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);
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
  /* Let a allAuthors object that is empty */
  let allAuthors = {};
  /* START LOOP: for every article: */
  for(let article of articles){
    /* Let a allAuthors object that is empty */
    /* find tags wrapper */
    let authorWrapp = article.querySelector(optAuthorSelector);
    /* get tags (author) from data-tags attribute */
    const articleAuthor = article.getAttribute('data-author')
    const authorNameAndSurname = articleAuthor.split('-')
    const authorName = authorNameAndSurname[0];
    const authorSurname = authorNameAndSurname[1];
    const authorCombo = 'by ' + authorName +' '+ authorSurname;
    /*const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + 'by ' + authorName +' '+ authorSurname + '</span></a>'; */
    const linkHTMLData = {id: articleAuthor, title: authorCombo};
    const linkHTML = templates.authorInArticleLink(linkHTMLData);

    /* add generated code to html variable */
    authorWrapp.insertAdjacentHTML("afterbegin",linkHTML)
    /* Check if this link is NOT already in allAuthors. If allAuthors does not have an author key */
    if (!allAuthors[articleAuthor]) {
      /* Add autor to allAuthors */
        allAuthors[articleAuthor] = 1;
        /* else: add number to "author" */
      } else {
        allAuthors [articleAuthor]++;
      }
    /* insert HTML of all the links into the tags wrapper */
    }
  /* Find the list of authors in right column */
  const authorList = document.querySelector(optAuthorListSelector);

  const allAuthorData = {authors: []};
  /* Create a new allAuthorsHTML variable for all the HTML code  */
  for(let author in allAuthors){
    const authorSplit = author.split('-')
    const authorCombo = authorSplit[0] + ' ' + authorSplit[1];
    /* [NEW] generate code of a link and add it to allTagsHTML */
   /* const tagLinkHTML = '<li><a href="#author-' + author + '"><span>' + authorCombo + ' [' + allAuthors[author] + ']' + '</span></a></li>'; */
    allAuthorData.authors.push({
      author: author,
      count: allAuthors[author],
      authorCombo: authorCombo
    });
  }
    console.log(allAuthorData);
    authorList.innerHTML = templates.authorCloudLink(allAuthorData);
  /* Add allAuthors to allAuthorsHTML */
}
generateAuthor();

/* Adding an event after clicking on author name */

const authorClickHandler = function (event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href')
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



/* Right column with authors links */

/* Generate list of authors in the right bar */
/* I will need to add this part to the exisiting function
*/

/* Filter the articles by author after clicking*/

}