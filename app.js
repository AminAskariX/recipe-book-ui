const recipes = [
  { name:'املت گوجه', category:'صبحانه', minutes:15, ingredients:['تخم‌مرغ','گوجه','پیاز'], steps:'پیاز و گوجه را تفت دهید؛ تخم‌مرغ را اضافه کنید و تا پخت دلخواه هم بزنید.' },
  { name:'سالاد شیرازی', category:'کنار غذا', minutes:15, ingredients:['خیار','گوجه','پیاز','آبلیمو'], steps:'مواد را ریز خرد کنید و با آبلیمو مخلوط کنید.' },
  { name:'پاستا با سبزیجات', category:'غذای اصلی', minutes:35, ingredients:['پاستا','فلفل دلمه‌ای','قارچ'], steps:'پاستا را بپزید؛ سبزیجات را تفت دهید و با آن مخلوط کنید.' },
  { name:'سوپ عدس', category:'غذای اصلی', minutes:50, ingredients:['عدس','هویج','پیاز'], steps:'مواد را با آب بپزید تا نرم شوند و سپس مزه را تنظیم کنید.' },
  { name:'ماست و خیار', category:'کنار غذا', minutes:10, ingredients:['ماست','خیار','نعنا'], steps:'خیار خردشده و نعنا را با ماست ترکیب کنید.' },
  { name:'پنکیک ساده', category:'صبحانه', minutes:25, ingredients:['آرد','شیر','تخم‌مرغ'], steps:'مواد را مخلوط کنید و هر طرف را در تابهٔ نچسب بپزید.' }
];
const search = document.getElementById('search');
const category = document.getElementById('category');
const time = document.getElementById('time');
const container = document.getElementById('recipes');
const count = document.getElementById('count');
for (const value of [...new Set(recipes.map(item => item.category))]) {
  const option = document.createElement('option');
  option.value = option.textContent = value;
  category.append(option);
}
function render() {
  const term = search.value.trim().toLocaleLowerCase('fa');
  const limit = Number(time.value);
  const matches = recipes.filter(item =>
    (category.value === 'all' || item.category === category.value) &&
    (!limit || item.minutes <= limit) &&
    (!term || [item.name, ...item.ingredients].some(value => value.toLocaleLowerCase('fa').includes(term)))
  );
  count.textContent = matches.length + ' دستور پیدا شد';
  container.replaceChildren();
  if (!matches.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = 'دستوری با این فیلترها پیدا نشد.';
    container.append(empty);
  }
  for (const item of matches) {
    const card = document.createElement('article');
    const title = document.createElement('h2');
    title.textContent = item.name;
    const meta = document.createElement('small');
    meta.textContent = item.category + ' · ' + item.minutes + ' دقیقه';
    const list = document.createElement('ul');
    for (const ingredient of item.ingredients) {
      const li = document.createElement('li');
      li.textContent = ingredient;
      list.append(li);
    }
    const steps = document.createElement('p');
    steps.textContent = item.steps;
    card.append(title, meta, list, steps);
    container.append(card);
  }
}
for (const input of [search, category, time]) input.addEventListener('input', render);
render();
