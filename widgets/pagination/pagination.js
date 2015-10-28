var React = require('react');
var ReactDOM = require('react-dom');
var defaults = require('lodash/object/defaults');

var utils = require('../../lib/utils.js');
var autoHideContainer = require('../../decorators/autoHideContainer');
var defaultLabels = {
  previous: '‹',
  next: '›',
  first: '«',
  last: '»'
};

/**
 * Add a pagination menu to navigate through the results
 * @param  {string|DOMElement} options.container CSS Selector or DOMElement to insert the widget
 * @param  {Object} [options.cssClasses] CSS classes to be added
 * @param  {string} [options.cssClasses.root] CSS classes added to the parent <ul>
 * @param  {string} [options.cssClasses.item] CSS classes added to each <li>
 * @param  {string} [options.cssClasses.page] CSS classes added to page <li>
 * @param  {string} [options.cssClasses.previous] CSS classes added to the previous <li>
 * @param  {string} [options.cssClasses.next] CSS classes added to the next <li>
 * @param  {string} [options.cssClasses.first] CSS classes added to the first <li>
 * @param  {string} [options.cssClasses.last] CSS classes added to the last <li>
 * @param  {string} [options.cssClasses.active] CSS classes added to the active <li>
 * @param  {string} [options.cssClasses.disabled] CSS classes added to the disabled <li>
 * @param  {Object} [options.labels] Text to display in the various links (prev, next, first, last)
 * @param  {string} [options.labels.previous] Label for the Previous link
 * @param  {string} [options.labels.next] Label for the Next link
 * @param  {string} [options.labels.first] Label for the First link
 * @param  {string} [options.labels.last] Label for the Last link
 * @param  {number} [options.maxPages=20] The max number of pages to browse
 * @param  {number} [options.padding=3] The number of pages to display on each side of the current page
 * @param  {string|DOMElement|boolean} [options.scrollTo='body'] Where to scroll after a click, set to `false` to disable
 * @param  {boolean} [options.showFirstLast=true] Define if the First and Last links should be displayed
 * @param  {boolean} [options.hideContainerWhenNoResults=true] Hide the container when no results match
 * @return {Object}
 */
function pagination({
    container,
    cssClasses = {},
    labels = {},
    maxPages = 20,
    padding = 3,
    showFirstLast = true,
    hideContainerWhenNoResults = true,
    scrollTo = 'body'
  }) {
  if (scrollTo === true) {
    scrollTo = 'body';
  }

  var containerNode = utils.getContainerNode(container);
  var scrollToNode = scrollTo !== false ? utils.getContainerNode(scrollTo) : false;

  if (!container) {
    throw new Error('Usage: pagination({container[, cssClasses.{root,item,page,previous,next,first,last,active,disabled}, labels.{previous,next,first,last}, maxPages, showFirstLast, hideContainerWhenNoResults]})');
  }

  labels = defaults(labels, defaultLabels);

  return {
    setCurrentPage: function(helper, pageNumber) {
      helper.setCurrentPage(pageNumber);
      if (scrollToNode !== false) {
        scrollToNode.scrollIntoView();
      }
      helper.search();
    },

    render: function({results, helper, createURL, state}) {
      var currentPage = results.page;
      var nbPages = results.nbPages;
      var nbHits = results.nbHits;
      var hasResults = nbHits > 0;

      if (maxPages !== undefined) {
        nbPages = Math.min(maxPages, results.nbPages);
      }

      var Pagination = autoHideContainer(require('../../components/Pagination/Pagination.js'));
      ReactDOM.render(
        <Pagination
          createURL={(page) => createURL(state.setPage(page))}
          cssClasses={cssClasses}
          currentPage={currentPage}
          hasResults={hasResults}
          hideContainerWhenNoResults={hideContainerWhenNoResults}
          labels={labels}
          nbHits={nbHits}
          nbPages={nbPages}
          padding={padding}
          setCurrentPage={this.setCurrentPage.bind(this, helper)}
          showFirstLast={showFirstLast}
        />,
        containerNode
      );
    }
  };
}

module.exports = pagination;