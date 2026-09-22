/** Набор настраиваемых диалогов
Примеры вызовов:

# Простой текст – без кнопок в параметрах
msg('Запись обновлена');
msg('Запись обновлена', 'Готово');

# С кастомной кнопкой
msg('Удалить?', '⚠️', btn('Удалить', () => deleteEntry(id)));

# Три кнопки
msg('Дубликаты', 'Внимание',
  btn('Объединить', mergeDupes),
  btn('Пропустить'),
  btn('Подробнее', () => msg.json(dupes, 'Список'))
);

*/

function btn(label, cb) {
  return { label, cb: typeof cb === 'function' ? cb : null };
}

const msg = Object.assign(
  function(text, title, pbt, nbt, ntbt) {
    const d = dialog().title(title || 'ℹ️').text(String(text));

    // Positive – если не передали, дефолтный 'OK' без колбэка
    if (pbt && pbt.cb) {
      d.positiveButton(pbt.label, () => pbt.cb());
    } else if (pbt) {
      d.positiveButton(pbt.label);
    } else {
      d.positiveButton('OK');
    }

    // Negative – только если передали
    if (nbt) {
      if (nbt.cb) d.negativeButton(nbt.label, () => nbt.cb());
      else d.negativeButton(nbt.label);
    }

    // Neutral – только если передали
    if (ntbt) {
      if (ntbt.cb) d.neutralButton(ntbt.label, () => ntbt.cb());
      else d.neutralButton(ntbt.label);
    }

    d.show();
  },
  {
    ui: function(objUi, title, pbt, nbt, ntbt) {
      if (!objUi) {
        msg('Ошибка: objUi не передан', '⚠️', pbt, nbt, ntbt);
        return;
      }
      const d = dialog().title(title || 'ℹ️').view(objUi);

      if (pbt && pbt.cb) d.positiveButton(pbt.label, () => pbt.cb());
      else if (pbt) d.positiveButton(pbt.label);
      else d.positiveButton('OK');

      if (nbt) {
        if (nbt.cb) d.negativeButton(nbt.label, () => nbt.cb());
        else d.negativeButton(nbt.label);
      }

      if (ntbt) {
        if (ntbt.cb) d.neutralButton(ntbt.label, () => ntbt.cb());
        else d.neutralButton(ntbt.label);
      }

      d.show();
    },

    json: function(obj, title, pbt, nbt, ntbt) {
      let json;
      try {
        json = JSON.stringify(obj, null, 2);
      } catch (e) {
        json = 'Ошибка сериализации: ' + String(e.message);
      }
      const d = dialog().title(title || '📄 JSON').view(ui().edit(json));

      if (pbt && pbt.cb) d.positiveButton(pbt.label, () => pbt.cb());
      else if (pbt) d.positiveButton(pbt.label);
      else d.positiveButton('Закрыть');

      if (nbt) {
        if (nbt.cb) d.negativeButton(nbt.label, () => nbt.cb());
        else d.negativeButton(nbt.label);
      }

      if (ntbt) {
        if (ntbt.cb) d.neutralButton(ntbt.label, () => ntbt.cb());
        else d.neutralButton(ntbt.label);
      }

      d.show();
    }
  }
);
