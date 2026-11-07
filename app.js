/* ===== Настройки: номер для заказов. Формат без плюса, например 77003693027 ===== */
var CONFIG = {
  waPhone: '77003693027',     // номер кафе из 2ГИС
  testMode: true,             // false убирает пометку о тестовой версии в корзине
  storeKey: 'plov-u-abaya-cart-v1'
};

var CATS = [
  { id: 'plov', name: 'Плов', icon: 'i-plov' },
  { id: 'shashlik', name: 'Шашлык', icon: 'i-skewer' },
  { id: 'hot', name: 'Супы и горячее', icon: 'i-soup' },
  { id: 'salad', name: 'Салаты и закуски', icon: 'i-salad' },
  { id: 'bake', name: 'Выпечка', icon: 'i-bake' },
  { id: 'drink', name: 'Напитки', icon: 'i-cup' }
];

var MENU = [
  { id: 'p1', cat: 'plov', name: 'Плов по-узбекски', desc: 'Рассыпчатый рис, мясо, жёлтая морковь, нут и головка чеснока.', price: 2200 },
  { id: 'p2', cat: 'plov', name: 'Плов с казы', desc: 'Классический плов с ломтиками конской колбасы казы.', price: 2900 },
  { id: 'p3', cat: 'plov', name: 'Плов с курицей', desc: 'Лёгкий вариант: рис, куриное мясо, морковь и специи.', price: 1900 },
  { id: 'p4', cat: 'plov', name: 'Плов на двоих', desc: 'Большая порция из казана с мясом и гарниром для двоих.', price: 4100 },

  { id: 's1', cat: 'shashlik', name: 'Шашлык из баранины', desc: 'Сочная мякоть на углях, с маринованным луком.', price: 1400 },
  { id: 's2', cat: 'shashlik', name: 'Шашлык из курицы', desc: 'Куриное бедро в кефирном маринаде.', price: 1000 },
  { id: 's3', cat: 'shashlik', name: 'Люля-кебаб', desc: 'Рубленая баранина со специями, приготовленная на мангале.', price: 1200 },
  { id: 's4', cat: 'shashlik', name: 'Рёбрышки на углях', desc: 'Бараньи рёбрышки с хрустящей корочкой.', price: 1900 },

  { id: 'h1', cat: 'hot', name: 'Лагман', desc: 'Домашняя лапша, говядина и овощи в густом бульоне.', price: 2300 },
  { id: 'h2', cat: 'hot', name: 'Шурпа', desc: 'Наваристый бульон, баранина, картофель и овощи.', price: 2400 },
  { id: 'h3', cat: 'hot', name: 'Манты, 5 шт.', desc: 'Крупные манты с мясом и луком, приготовленные на пару.', price: 2600 },
  { id: 'h4', cat: 'hot', name: 'Жаркое по-домашнему', desc: 'Томлёное мясо с картофелем и зеленью.', price: 2500 },

  { id: 'a1', cat: 'salad', name: 'Ачичук', desc: 'Тонко нарезанные помидоры и лук со свежей зеленью.', price: 900 },
  { id: 'a2', cat: 'salad', name: 'Салат «Свежий»', desc: 'Огурцы, помидоры, перец и зелень с растительным маслом.', price: 1000 },
  { id: 'a3', cat: 'salad', name: 'Морковь по-корейски', desc: 'Острая, с кориандром и чесноком.', price: 800 },

  { id: 'b1', cat: 'bake', name: 'Самса с мясом', desc: 'Слоёное тесто, баранина и лук, из тандыра.', price: 700 },
  { id: 'b2', cat: 'bake', name: 'Самса с тыквой', desc: 'Сладковатая тыква с луком и зирой.', price: 600 },
  { id: 'b3', cat: 'bake', name: 'Лепёшка из тандыра', desc: 'Тёплая, с румяной корочкой.', price: 300 },

  { id: 'd1', cat: 'drink', name: 'Чёрный чай, чайник', desc: 'Свежая заварка, хватит на две-три чашки.', price: 700 },
  { id: 'd2', cat: 'drink', name: 'Зелёный чай, чайник', desc: 'Свежая заварка, хватит на две-три чашки.', price: 700 },
  { id: 'd3', cat: 'drink', name: 'Морс ягодный, 0,5 л', desc: 'Домашний, с кислинкой.', price: 600 },
  { id: 'd4', cat: 'drink', name: 'Компот, 0,5 л', desc: 'Из сухофруктов.', price: 500 },
  { id: 'd5', cat: 'drink', name: 'Айран, 0,5 л', desc: 'Холодный, освежающий.', price: 600 },
  { id: 'd6', cat: 'drink', name: 'Газировка, 0,5 л', desc: 'Охлаждённая.', price: 700 }
];

var byId = {};
MENU.forEach(function (m) { byId[m.id] = m; });
var iconOf = {};
CATS.forEach(function (c) { iconOf[c.id] = c.icon; });

/* ===== Корзина ===== */
var cart = loadCart();

function loadCart() {
  try {
    var raw = localStorage.getItem(CONFIG.storeKey);
    var obj = raw ? JSON.parse(raw) : {};
    var out = {};
    Object.keys(obj).forEach(function (id) {
      var q = obj[id];
      if (byId[id] && Number.isInteger(q) && q > 0) out[id] = Math.min(q, 99);
    });
    return out;
  } catch (e) { return {}; }
}
function saveCart() {
  try { localStorage.setItem(CONFIG.storeKey, JSON.stringify(cart)); } catch (e) { /* без хранилища корзина живёт до закрытия страницы */ }
}
function count() { return Object.keys(cart).reduce(function (s, id) { return s + cart[id]; }, 0); }
function total() { return Object.keys(cart).reduce(function (s, id) { return s + cart[id] * byId[id].price; }, 0); }
function fmt(n) { return n.toLocaleString('ru-RU') + ' ₸'; }
function plain(n) { return fmt(n).replace(/[  ]/g, ' '); }
function cartItems() { return MENU.filter(function (m) { return cart[m.id]; }); }

function setQty(id, q) {
  q = Math.max(0, Math.min(99, q));
  if (q === 0) delete cart[id]; else cart[id] = q;
  saveCart();
  sync();
}

/* ===== Меню ===== */
function stepHTML(id, name, qty) {
  return '<div class="step">' +
    '<button type="button" data-act="dec" data-id="' + id + '" aria-label="Убавить: ' + name + '">−</button>' +
    '<output aria-live="polite">' + qty + '</output>' +
    '<button type="button" data-act="inc" data-id="' + id + '" aria-label="Добавить ещё: ' + name + '">+</button>' +
    '</div>';
}
function dishHTML(m) {
  return '<article class="dish" data-id="' + m.id + '">' +
    '<div class="dish-ico"><svg aria-hidden="true" viewBox="0 0 64 64"><use href="#' + iconOf[m.cat] + '"/></svg></div>' +
    '<div class="dish-body"><h4>' + m.name + '</h4><p>' + m.desc + '</p></div>' +
    '<div class="dish-foot"><span class="price">' + fmt(m.price) + '</span>' +
    '<div class="act">' +
    '<button type="button" class="btn btn-add" data-act="add" data-id="' + m.id + '">В корзину</button>' +
    '<span class="step-slot" hidden>' + stepHTML(m.id, m.name, 1) + '</span>' +
    '</div></div></article>';
}
function buildMenu() {
  document.getElementById('chips').innerHTML =
    '<button type="button" class="chip" data-filter="all" aria-pressed="true">Всё меню</button>' +
    CATS.map(function (c) { return '<button type="button" class="chip" data-filter="' + c.id + '" aria-pressed="false">' + c.name + '</button>'; }).join('');
  document.getElementById('menu-list').innerHTML = CATS.map(function (c) {
    var items = MENU.filter(function (m) { return m.cat === c.id; });
    return '<section class="cat" data-cat="' + c.id + '"><h3 class="cat-title">' + c.name + '</h3>' +
      '<div class="grid">' + items.map(dishHTML).join('') + '</div></section>';
  }).join('');
}
function syncMenu() {
  document.querySelectorAll('#menu-list .dish').forEach(function (card) {
    var id = card.dataset.id, q = cart[id] || 0;
    card.querySelector('[data-act="add"]').hidden = q > 0;
    card.querySelector('.step-slot').hidden = q === 0;
    card.querySelector('output').textContent = q;
  });
}

/* ===== Корзина: чек ===== */
function renderCart() {
  var items = cartItems();
  document.getElementById('cart-empty').hidden = items.length > 0;
  document.getElementById('cart-full').hidden = items.length === 0;
  document.getElementById('lines').innerHTML = items.map(function (m) {
    var q = cart[m.id];
    return '<li class="line">' +
      '<div class="l-top"><span class="l-name">' + m.name + '</span><span class="l-sum">' + fmt(m.price * q) + '</span></div>' +
      '<div class="l-bot">' + stepHTML(m.id, m.name, q) +
      '<span class="l-unit">' + fmt(m.price) + ' за шт.</span>' +
      '<button type="button" class="link-del" data-act="del" data-id="' + m.id + '" aria-label="Убрать из корзины: ' + m.name + '">Убрать</button>' +
      '</div></li>';
  }).join('');
  document.getElementById('r-total').textContent = fmt(total());
  updateOrderLink();
}

/* ===== Текст заказа и ссылка WhatsApp ===== */
function mode() { return document.getElementById('mode-delivery').checked ? 'delivery' : 'pickup'; }
function val(id) { return document.getElementById(id).value.trim(); }

function orderText() {
  var lines = cartItems().map(function (m, i) {
    return (i + 1) + '. ' + m.name + ' × ' + cart[m.id] + ' = ' + plain(m.price * cart[m.id]);
  });
  var parts = ['Здравствуйте! Хочу оформить заказ в «Плов у Абая»:', ''].concat(lines);
  parts.push('', 'Итого: ' + plain(total()), '');
  if (mode() === 'delivery') parts.push('Получение: доставка' + (val('f-addr') ? ', адрес: ' + val('f-addr') : ''));
  else parts.push('Получение: самовывоз');
  if (val('f-name')) parts.push('Имя: ' + val('f-name'));
  if (val('f-note')) parts.push('Комментарий: ' + val('f-note'));
  return parts.join('\n');
}
function waUrl() {
  return 'https://wa.me/' + CONFIG.waPhone + '?text=' + encodeURIComponent(orderText());
}
function updateOrderLink() {
  var btn = document.getElementById('order-btn');
  var empty = count() === 0;
  btn.href = empty ? '#cart' : waUrl();
  btn.setAttribute('aria-disabled', empty ? 'true' : 'false');
}
function showErr(msg) {
  var el = document.getElementById('order-err');
  el.textContent = msg || '';
  el.hidden = !msg;
}

/* ===== Обновление интерфейса ===== */
function sync() {
  var n = count(), t = total();
  var badge = document.getElementById('cart-count');
  badge.textContent = n; badge.hidden = n === 0;
  document.getElementById('cb-n').textContent = n;
  document.getElementById('cb-sum').textContent = fmt(t);
  var inCart = currentView() === 'cart';
  document.getElementById('cartbar').hidden = n === 0 || inCart;
  document.body.classList.toggle('has-bar', n > 0 && !inCart);
  syncMenu();
  if (inCart) renderCart();
}

function refocus(scopeSel, id, act) {
  var scope = document.querySelector(scopeSel);
  if (!scope) return;
  var t = scope.querySelector('[data-id="' + id + '"][data-act="' + act + '"]');
  if (!t || t.closest('[hidden]')) t = scope.querySelector('[data-id="' + id + '"][data-act="add"]');
  if (!t || t.closest('[hidden]')) t = scope.querySelector('.link-del, [data-act="inc"]') || document.getElementById('cart-title');
  if (t) t.focus();
}

document.addEventListener('click', function (e) {
  var b = e.target.closest('[data-act]');
  if (b) {
    var id = b.dataset.id, act = b.dataset.act;
    var scope = b.closest('#view-cart') ? '#view-cart' : '#menu-list';
    if (act === 'add') { setQty(id, 1); refocus(scope, id, 'inc'); }
    else if (act === 'inc') { setQty(id, (cart[id] || 0) + 1); refocus(scope, id, 'inc'); }
    else if (act === 'dec') { setQty(id, (cart[id] || 0) - 1); refocus(scope, id, 'dec'); }
    else if (act === 'del') { setQty(id, 0); refocus(scope, id, 'del'); }
    return;
  }
  var f = e.target.closest('[data-filter]');
  if (f) {
    var key = f.dataset.filter;
    document.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', c === f ? 'true' : 'false'); });
    document.querySelectorAll('#menu-list .cat').forEach(function (s) { s.hidden = key !== 'all' && s.dataset.cat !== key; });
  }
});

/* форма */
document.getElementById('order-form').addEventListener('submit', function (e) { e.preventDefault(); });
['f-name', 'f-addr', 'f-note', 'mode-pickup', 'mode-delivery'].forEach(function (id) {
  document.getElementById(id).addEventListener('input', function () { showErr(''); updateOrderLink(); });
  document.getElementById(id).addEventListener('change', function () {
    document.getElementById('addr-wrap').hidden = mode() !== 'delivery';
    showErr(''); updateOrderLink();
  });
});

document.getElementById('order-btn').addEventListener('click', function (e) {
  if (count() === 0) { e.preventDefault(); return; }
  if (mode() === 'delivery' && !val('f-addr')) {
    e.preventDefault();
    showErr('Укажите адрес доставки или выберите самовывоз.');
    document.getElementById('f-addr').focus();
    return;
  }
  showErr('');
  this.href = waUrl();
});

document.getElementById('copy-btn').addEventListener('click', function () {
  if (count() === 0) return;
  var text = orderText();
  var box = document.getElementById('copybox');
  function fallback() { box.value = text; box.hidden = false; box.focus(); box.select(); }
  try {
    navigator.clipboard.writeText(text).then(function () {
      var btn = document.getElementById('copy-btn');
      btn.textContent = 'Скопировано';
      setTimeout(function () { btn.textContent = 'Скопировать текст заказа'; }, 1800);
    }).catch(fallback);
  } catch (e) { fallback(); }
});

/* ===== Вкладки по якорю ===== */
function currentView() { return location.hash === '#cart' ? 'cart' : 'main'; }
var lastView = 'main';
function route() {
  var view = currentView();
  document.getElementById('view-main').hidden = view === 'cart';
  document.getElementById('view-cart').hidden = view !== 'cart';
  sync();
  if (view === 'cart') {
    window.scrollTo(0, 0);
  } else {
    var h = location.hash.slice(1);
    var el = h ? document.getElementById(h) : null;
    if (el) el.scrollIntoView();
    else if (lastView === 'cart') window.scrollTo(0, 0);
  }
  lastView = view;
}
window.addEventListener('hashchange', route);

/* ===== Старт ===== */
document.getElementById('r-date').textContent = 'Чек от ' + new Date().toLocaleDateString('ru-RU');
if (CONFIG.testMode) {
  var tn = document.getElementById('test-note');
  tn.textContent = 'Тестовая версия: заказ откроется в чате с номером +' + CONFIG.waPhone.replace(/^7(\d{3})(\d{3})(\d{2})(\d{2})$/, '7 $1 $2 $3 $4') + '.';
  tn.hidden = false;
}
buildMenu();
route();
