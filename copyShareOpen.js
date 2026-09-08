function copyToClipboard(text) {
  if (!text || text.trim() === "") {
    message("Нет текста для копирования");
    return;
  }

  try {
    // Получаем Context приложения через ActivityThread
    var ActivityThread = Packages.android.app.ActivityThread;
    var context = ActivityThread.currentApplication();

    // Получаем ClipboardManager
    var ClipboardManager = Packages.android.content.ClipboardManager;
    var clipboard = context.getSystemService(context.CLIPBOARD_SERVICE);

    // Создаём ClipData и кладём в буфер
    var ClipData = Packages.android.content.ClipData;
    var clip = ClipData.newPlainText("MementoDB", text);
    clipboard.setPrimaryClip(clip);

  } catch (e) {
    log("Ошибка копирования: " + e);
    message("Не удалось скопировать: " + e);
  }
}

function shareText(text) {
  if (!text || text.trim() === "") {
    message("Нет текста для отправки");
    return;
  }

  try {
    // Context приложения
    var ActivityThread = Packages.android.app.ActivityThread;
    var context = ActivityThread.currentApplication();

    // Intent ACTION_SEND
    var Intent = Packages.android.content.Intent;
    var intent = new Intent(Intent.ACTION_SEND);
    intent.setType("text/plain");
    intent.putExtra(Intent.EXTRA_TEXT, text);

    // Создаём chooser и запускаем
    var chooser = Intent.createChooser(intent, "Поделиться");
    chooser.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    context.startActivity(chooser);

  } catch (e) {
    log("Ошибка: " + e);
    message("Не удалось поделиться: " + e);
  }
}


function openLink(url) {
  if (!url || url.trim() === "") {
    message("Нет ссылки для открытия");
    return;
  }

  // Добавляем http://, если нет протокола (чтобы Intent понял, что это URL)
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url.trim();
  }

  try {
	// Получаем Context приложения через ActivityThread
	var ActivityThread = Packages.android.app.ActivityThread;
	var context = ActivityThread.currentApplication();

	var Intent = Packages.android.content.Intent;
	var Uri = Packages.android.net.Uri;

	var intent = new Intent(Intent.ACTION_VIEW);
	intent.setData(Uri.parse(url));
	intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

	context.startActivity(intent);
  } catch (e) {
    message("Ошибка: " + e);
  }
}


function parseTextUrl(text) {
  //Вытащить ссылку из текста и открыть ее
  //"Текст со ссылкой https://batchtools.pro/ru/overlay"
  var raw = text || "";

  var match = raw.match(/https?:\/\/[^\s"')\]>]+/i);
  if (match) {
    openLink(match[0]);
  } else {
    message("Не найдена ссылка в тексте");
  }
}
