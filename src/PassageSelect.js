import React, { useEffect, useState } from 'react';
import { getTitles } from './memory-api';
import './passage-select.css';

function PassageSelect(props) {
  const [ state, setState ] = useState({ passage: '', showDropdown: false, title: '', refs: [] });

  const handleKey = (e) => {
    var el = e.currentTarget;
    setState({ ...state, passage: el.value });
    if (el.value.length >= 3) {
      getTitles(el.value).then(res => {
        var refs = res;
        setState({ ...state, passage: el.value, showDropdown: true, refs: refs });
      });
    }
  }

  const handleDropdown = (e) => {
    e.preventDefault();
    var el = e.currentTarget;
    var { refndx } = el.dataset;
    var select = state.refs[refndx];
    var title = select.chapter ? `${select.book} ${select.chapter}` : select;
    setState({ ...state, passage: '', title, showDropdown: false });
    if (select.chapter) {
      props.selectPassage(select.book, select.chapter);
    } else {
      props.selectPassage(select);
    }
  }

  const handleSelect = (e) => {
    e.preventDefault();
    var el = e.currentTarget;
    getTitles(el.value).then(res => {
      if (res.length === 1) {
        if (parseInt(res[0].chapter, 10)) {
          props.selectPassage(res[0].book, res[0].chapter);
        } else {
          props.selectPassage(res[0]);
        }
      }
    });
  }

  return (
    <div className="passage-header">
      <div>
        <input value={state.passage} type="text" placeholder="Enter passage" id="passage-select" onChange={handleKey} onBlur={handleSelect} />
        <div className={'dropdown ' + (state.showDropdown ? 'show-dropdown' : 'hide-dropdown') }>
          <ul>
          { 
            state.refs.map((item, key) => {
              var title = item.chapter ? `${item.book} ${item.chapter}` : item;
              return <li key={key} onClick={handleDropdown} data-refndx={key}>{title}</li>;
            })
          }
          </ul>
        </div>
      </div>
      <div>
        <h2>{state.title}</h2>
      </div>
    </div>
  );
}

export default PassageSelect;
