

function makeAction(type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args);
};

const initNote = {
  id: +new Date(),
  title: '我的笔记',
  content: '第一篇笔记内容',
  favorite: false
};

// 模拟初始化数据
const initData = {
  show: 'all',
  notes: [initNote],
  activeNote: initNote
};

export const initStore = ({ dispatch }) => {
  dispatch('INIT_STORE', initData);
};



function makeAction(type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args);
};

const initNote = {
  id: +new Date(),
  title: '我的笔记',
  content: '第一篇笔记内容',
  favorite: false
};

// 模拟初始化数据
const initData = {
  show: 'all',
  notes: [initNote],
  activeNote: initNote
};

export const initStore = ({ dispatch }) => {
  dispatch('INIT_STORE', initData);
};




