import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

import headerFooterHOC from '../../decorators/headerFooter.js';
import autoHideContainerHOC from '../../decorators/autoHideContainer.js';
import RefinementSelectComponent from '../../components/RefinementSelect/RefinementSelect.js';
import defaultTemplates from './defaultTemplates.js';

import {
  getContainerNode,
  prepareTemplateProps,
  bemHelper,
} from '../../lib/utils.js';

const bem = bemHelper('ais-refinement-select');

const usage = `Usage:
refinementSelect({
  container,
  attributeName,
  [ autoHideContainer=true ],
  [ sortBy=['count:desc', 'name:asc'] ],
  [ limit=10 ],
  [ cssClasses.{root,header,body,footer,select,option}={} ],
})`;

function refinementSelect({
  container,
  attributeName,
  limit = 10,
  autoHideContainer = true,
  sortBy = ['count:desc', 'name:asc'],
  cssClasses: userCssClasses = {},
  templates = defaultTemplates,
} = {}) {
  if (!container || !attributeName) {
    throw new Error(usage);
  }

  const containerNode = getContainerNode(container);

  const RefinementSelect = autoHideContainer === true
    ? autoHideContainerHOC(headerFooterHOC(RefinementSelectComponent))
    : headerFooterHOC(RefinementSelectComponent);

  const hierarchicalFacetName = attributeName;

  const cssClasses = {
    root: cx(bem(null), userCssClasses.root),
    header: cx(bem('header'), userCssClasses.header),
    body: cx(bem('body'), userCssClasses.body),
    footer: cx(bem('footer'), userCssClasses.footer),
    select: cx(bem('select'), userCssClasses.select),
    option: cx(bem('option'), userCssClasses.option),
  };

  return {
    init({helper, templatesConfig}) {
      this._templateProps = prepareTemplateProps({defaultTemplates, templatesConfig, templates});

      this._toggleRefinement = facetValue => helper
        .toggleRefinement(hierarchicalFacetName, facetValue)
        .search();

      this._clearRefinements = () => helper
        .clearRefinements(hierarchicalFacetName)
        .search();
    },

    render({results}) {
      const facetValues = results.getFacetValues(hierarchicalFacetName, {sortBy}).data || [];

      ReactDOM.render(
        <RefinementSelect
          shouldAutoHideContainer={ false }
          cssClasses={ cssClasses }
          facetValues={ facetValues }
          templateProps={ this._templateProps }
          toggleRefinement={ this._toggleRefinement }
          clearRefinements={ this._clearRefinements }
          limit={ limit }
        />,
        containerNode
      );
    },
  };
}

export default refinementSelect;