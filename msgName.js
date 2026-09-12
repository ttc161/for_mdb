/* For development.   
Dialog for selecting field names 
in the library and generating text 
using a mask.
The function argument 
is the library id.
To work, you need to connect 
the JavaScript library 
"copyShareOpen.js"
*/

function msgName(idn) {
  let lbn = idn ? libById(idn) : lib();
  let title = idn ? lbn.title : 'Current library';
  /* Share buttons: 
    1 - only "Copy text",
    2 - only "Share text"
    3 - two buttons next to each other
    other - two buttons across the width of the dialog
  */
  const qtyBt = 1;
  //Button width in pixels
  const px = 385;
 
  //Elements of intervals
  let uiTb = ui().text('\t\t');
  let uiHt = ui().text('').font({ size: 8 });
  let uiLn = ui().text('—\t'.repeat(9));

  //Page 1
  let uiT1 = ui().text('Select field names and generate text using the mask on Page 2:').font({ size: 14, style: 'italic' });
  let list = lbn.fields();
  let items = list.map(a => ui().checkbox(a, false));

  let uiL01 = ui().layout([uiT1, uiLn].concat(items));

  //Page 2
  let uiT2 = ui().text("Text mask: # = field name:").font({ size: 14, style: 'italic' });
  let uiE1 = ui().edit("'#', ");
  let uiB1 = ui().button('Generate text').width_match_parent().action(() => {
    let mask = uiE1.text.split('#');
    let result = [];
    items.forEach((ui,idx) => { 
      if (ui.checked) {
        let row = mask.join( list[idx] );
        result.push(row);
      }
    });
    uiE2.text = result.join('').replace(/,\s*$/, '');
  }); 
  let uiE2 = ui().edit('');
  let uiB2 = ui().button('Copy text').action(() => { 
      let txt = uiE2.text;
      if (txt) copyToClipboard(txt);
  });

  let uiB3 = ui().button('Share text').width(px).action(() => { 
      let txt = uiE2.text;
      if (txt) shareText(txt);
  });

  let uiShare;
  if (qtyBt == 1) {
    uiB2.width_match_parent();
    uiShare = uiB2;
  } else if (qtyBt == 2) {
    uiB3.width_match_parent();
    uiShare = uiB3;
  } else if (qtyBt == 3) {
    uiB2.width(px);
    uiB3.width(px);
    uiShare = ui().layout([uiB2, uiB3]).horizontal();
  } else {
    uiB2.width_match_parent();
    uiB3.width_match_parent();
    uiShare = ui().layout([uiB2, uiB3]);
  }

  let uiL02 =  ui().layout([uiT2, uiE1, uiHt, uiB1, uiHt, uiE2, uiHt, uiShare]);

  //Pages
  let uiPages = ui().pages([uiL01, uiL02]); 

  dialog()
    .title(title)
    .view(uiPages)
    .positiveButton('Exit')
    .show()
}
