/** Start Picker */
function dataPicker(ob) {
  const keyOk = (key) => {
    return Object.hasOwn(ob,key);
  }

  if (keyOk('fld') && !ob.fld) {
    message('Field name is not specified!');
    exit();
  }

  if (keyOk('to') && !ob.to) {
    message('The object entry() or array of objects is not specified.!');
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

  ob.ee = lb.entries();
  if (ob.ee.length < 1) {
    message('No icons found!');
    exit();
  }

  ob.folders = Array.from(
    new Set(
      ob.ee
      .map(a =>  a.field('folder'))
      .sort()
  ));

  ob.idx = 0;

  showGroups(ob);
}

/** Picker */
function showPicker(ob) {
  let folder = ob.folders[ob.idx];
  let items = ob.ee.filter(a => a.field('folder') == folder);
  let names = items.map(a => a.field('name')).sort();

  let elements = []; 
  names.forEach(nm => {
    let ic_str = [folder,nm].join(':');
    let obj = items.find(e => e.name == ic_str);
    let ic = obj.field('icon')[0];
    elements.push(
      ui().image(ic).height(124));
    elements.push(
      ui().button('')
        .width(160)
        .icon('nova:cursor-touch-1.png')
        .action(() => {
          ob.icon = ic;
          msg.ui(ui().image(ic)
            .height(256),ic_str);   
        })
     );
  });

  let uiTb = ui().text('\t'.repeat(5));
  let uiTh = ui().text('').font({ size: 5 }); //height indentation
  let e4 = chunkArray(elements, 4);
  let picker = ui().layout(
    e4.map(ar => {
      ar.splice(2,0,uiTb);
      return ui().layout(ar)
       .horizontal();
    })
  );

dialog()
  .view(picker)
  .positiveButton('Ok', () => {
    delete ob.ee;
    msg.json(ob);

    if (ob.to && ob.icon) {
      if (ob.to.length > 0) {
        ob.to.forEach(e => e.set(ob.fld, ob.icon));
      } else {
        ob.to.set(ob.fld, ob.icon);
      }
      return true;
    } else {
      message('Icon not selected or no object specified!')
    }
  })
  .negativeButton('Cancel') 
  .neutralButton('Groups', () => {
    ob.icon = '';
    showGroups(ob);
  }) 
  .show()
}


/** Groups */
function showGroups(ob) {
  //form elements
  let uiTh = ui().text('').font({ size: 5 }); //height indentation
  let uiT0 = ui().text('Select a group from the list:')
    .font({ size: 14, style: 'italic' });
  let uiC = ui().choiceBox(ob.idx, ob.folders);

  let page = ui().layout([ uiT0, uiTh, uiC ]);
  dialog()
  .title('Groups')
    .view(page)
    .positiveButton('Ok', () => {
      ob.idx = uiC.selected;
      showPicker(ob);
    }) 
    .negativeButton('Cancel') 
    .show();
}


/** Create subarrays */
function chunkArray(array, size) {
  if (!Array.isArray(array) || size <= 0) return [];
  const chunks = [];
  let index = 0;
  while (index < array.length) {
    chunks.push(array.slice(index, index + size));
    index += size;
  }
  return chunks;
}
