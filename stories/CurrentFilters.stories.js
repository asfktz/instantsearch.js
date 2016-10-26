import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {CurrentFilters, RefinementList} from '../packages/react-instantsearch/dom';
import {withKnobs} from '@kadira/storybook-addon-knobs';
import {WrapWithHits} from './util';

const stories = storiesOf('CurrentFilters', module);

stories.addDecorator(withKnobs);

stories.add('default', () =>
  <WrapWithHits >
    <div>
      <CurrentFilters />
      <RefinementList
        attributeName="colors"
        defaultRefinement={['Black']}
        theme={{root: {display: 'none'}}}
      /></div>
  </WrapWithHits>
);