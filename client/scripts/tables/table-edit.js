/**
 * Datatables editable demo page
 */
(function ($) {
  'use strict';

  var nEditing = null,
    oTable;

  function restoreRow(oTable, nRow) {
    var aData = oTable.fnGetData(nRow);
    var jqTds = $('>td', nRow);
    for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
      oTable.fnUpdate(aData[i], nRow, i, false);
    }
    oTable.fnDraw();
  }

  function editRow(oTable, nRow) {
    var aData = oTable.fnGetData(nRow);
    var jqTds = $('>td', nRow);
    jqTds[0].innerHTML = '<input type=\'text\' class=\'form-control\' value=\'' + aData[0] + '\'>';
    jqTds[1].innerHTML = '<input type=\'text\' class=\'form-control\' value=\'' + aData[1] + '\'>';
    jqTds[2].innerHTML = '<input type=\'text\' class=\'form-control\' value=\'' + aData[2] + '\'>';
    jqTds[3].innerHTML = '<input type=\'text\' class=\'form-control\' value=\'' + aData[3] + '\'>';
    jqTds[4].innerHTML = '<input type=\'text\' class=\'form-control\' value=\'' + aData[4] + '\'>';
    jqTds[5].innerHTML = '<a class=\'edit\' href=\'\'>Save</a>';
  }

  function saveRow(oTable, nRow) {
    var jqInputs = $('input', nRow);
    oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
    oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
    oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
    oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
    oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
    oTable.fnUpdate('<a class=\'edit\' href=\'\'>Edit</a>', nRow, 5, false);
    oTable.fnDraw();
  }

  oTable = $('.datatable').dataTable();

  $('.toolbar').append('<a id=\'new\' href=\'javascript:;\' class=\'btn btn-info m-l\'>Add new row</a>');

  $('#new').on('click', function (e) {
    e.preventDefault();
    var aiNew = oTable.fnAddData(['', '', '', '', '', '<a class=\'edit\' href=\'\'>Edit</a>', '<a class=\'delete\' href=\'\'>Delete</a>']);
    var nRow = oTable.fnGetNodes(aiNew[0]);
    editRow(oTable, nRow);
    nEditing = nRow;
  });

  $('.datatable').on('click', 'a.delete', function (e) {
    e.preventDefault();
    var nRow = $(this).parents('tr')[0];
    oTable.fnDeleteRow(nRow);
  });

  $('.datatable').on('click', 'a.edit', function (e) {
    e.preventDefault();
    var nRow = $(this).parents('tr')[0];
    if (nEditing !== null && nEditing !== nRow) {
      restoreRow(oTable, nEditing);
      editRow(oTable, nRow);
      nEditing = nRow;
    } else if (nEditing === nRow && this.innerHTML === 'Save') {
      saveRow(oTable, nEditing);
      nEditing = null;
    } else {
      editRow(oTable, nRow);
      nEditing = nRow;
    }
    return false;
  });
})(jQuery);