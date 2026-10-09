/** Start Helper 

//example of a call
const helpConfig = {
  //library id or title (one of two)
  lbid: '',     // library id (optional key)
  lbnm: '',  // library title (optional key)
  ide: '',  // entry().field('ide')
};

dataHelper(helpConfig);

*/
function dataHelper(ob) {
  const keyOk = (key) => {
    return Object.hasOwn(ob,key);
  }

  if (keyOk('ide') && !ob.ide) {
    message('Library entry ID not specified!');
    exit();
  }

  let lb;
  if (keyOk('lbid') && ob.lbid) {
    lb = libById(ob.lbid);
  }
  if (!lb && keyOk('lbnm') && ob.lbnm) {
    lb = libByName(ob.lbnm);
  }
  if (!lb) {
    lb = libByName('mdb_icon');
  }
  if (!lb) {
    message('Library not found!');
    exit();
  }

  let e = lb.entries().find(a => a.field('ide') == ob.ide);

  if (!e) {
    message('Entry not found!');
    exit();
  }

  let title = e.field('dialogue title') ?? 'ℹ️';

  let list = JSON.parse(JSON.stringify(e.field('data')));

  if (list.length < 1) {
    message('No data available!')
    exit();
  }

  const pics = e.field('pic');
  let items = list.map(obe => helpUi(obe,pics));
  let page = ui().layout(items);

  dialog()
    .title(title)
    .view(page)
    .positiveButton('Ok') 
    .show()
}


/** ui objects */
function helpUi(obe, pics) {
  let result = null;
  if (obe.type === 'text') {
    result = ui().text(obe.text);
    const hasFontParams = obe.size > 0 || obe.color || obe.style;
    if (hasFontParams) {
      const fontConfig = {};
      if (obe.size > 0) fontConfig.size = obe.size;
      if (obe.color) fontConfig.color = obe.color;
      if (obe.style) fontConfig.style = obe.style;
      result = result.font(fontConfig);
    }
  } else if (obe.type === 'image') {
    const num = obe.image_num ?? 1;
    if (num < 1 || num > pics.length) return null;

    let img = ui().image(pics[num-1]);
    if (obe.image_width) img = img.width(obe.image_width);
    if (obe.image_height) img = img.height(obe.image_height);

    let full = ui().image(pics[num-1])
      .height_match_parent()
      .width_match_parent();
    
    result = ui().layout([
      ui().button('')
        .icon('nova:cog-box.png')
        .action(() => {
          dialog()
            .title(obe.text)
            .view(full)
            .positiveButton('Ok') 
            .show();
        }),
      ui().text('\t\t\t'),
      img
    ]).horizontal();
  }

  if (obe['margin-bottom']) {
    return ui().layout([
      result,
      ui().text('').font({ size: obe.px ?? 5 })
    ]);
  }
  return result;
}
