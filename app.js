(function () {

  var RECIPE_IMG = {"cinnamon-green-smoothie": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/cinnamon-green-smoothie.jpg", "miso-ginger-beef-asparagus-with-quinoa": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/miso-ginger-beef-asparagus-with-quinoa.jpg", "peanut-butter-protein-yogurt-with-blackberries": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/peanut-butter-protein-yogurt-with-blackberries.jpg", "blueberry-vanilla-protein-oats": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/blueberry-vanilla-protein-oats.jpg", "orange-turmeric-overnight-oats": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/orange-turmeric-overnight-oats.jpg", "greek-yogurt-with-orange-blueberries-pumpkin-seeds": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/greek-yogurt-with-orange-blueberries-pumpkin-seeds.jpg", "brown-rice": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/brown-rice.jpg", "greek-yogurt-with-almonds-and-cherries": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/greek-yogurt-almonds-cherries.jpg", "celery-with-hummus": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/celery-hummus.jpg", "crackers-with-hummus": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/crackers-hummus.jpg", "dates-and-apple": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/dates-apple.jpg", "dark-chocolate-with-walnuts": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/dark-chocolate-walnuts.jpg", "garlic-oil-linguine": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/garlic-oil-linguine.jpg", "coconut-turmeric-cauliflower-bowls": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/coconut-turmeric-cauliflower-bowls.jpg", "almond-butter-banana-sandwich": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/almond-butter-banana-sandwich.jpg", "apple-with-almond-butter": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/apple-with-almond-butter.jpg", "grilled-bruschetta-chicken": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/grilled-bruschetta-chicken.jpg", "hummus-toast-with-avocado": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/hummus-toast-with-avocado.jpg", "mediterranean-turkey-rice-bowl": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/mediterranean-turkey-rice-bowl.jpg", "kiwi-walnut-overnight-oats": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/kiwi-walnut-overnight-oats.jpg", "mediterranean-roasted-tomato-chickpea-bowl": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/mediterranean-roasted-tomato-chickpea-bowl.jpg", "lentil-feta-tabbouleh": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/lentil-feta-tabbouleh.jpg", "herby-grilled-chicken-drumsticks": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/herby-grilled-chicken-drumsticks.jpg", "healthy-fish-and-chips": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/healthy-fish-n-chips.jpg", "muesli-with-yogurt-and-blueberries": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/muesli-with-yogurt-blueberries.jpg", "one-pan-chicken-chickpeas-and-broccoli": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/one-pan-chicken-chickpeas-broccoli.jpg", "one-pan-mediterranean-trout": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/one-pan-mediterranean-trout.jpg", "salmon-cucumber-bites": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/salmon-cucumber-bites.jpg", "one-pan-chicken-curried-brown-rice": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/one-pan-chicken-curried-brown-rice.jpg", "sweet-dijon-garden-salad": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/sweet-dijon-garden-salad.jpg", "overnight-oats-with-berries-and-walnuts": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/overnight-oats-with-berries-walnuts.jpg", "overnight-bircher-muesli": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/overnight-bircher-muesli.jpg", "tart-cherry-limeade": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/tart-cherry-limeade.jpg", "steamed-broccoli": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/steamed-broccoli.jpg", "pretzels-and-dates": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/pretzels-dates.jpg", "beef-sweet-potato-chili": "https://d2cfpv1ew88u62.cloudfront.net/images/recipes/beef-sweet-potato-chili.jpg"};

  /* ===== App state ===== */
  var plans = [];          /* { id, title, createdAt } */
  var activePlanId = null;

  var emptyView = document.getElementById('emptyView');
  var createdView = document.getElementById('createdView');
  var plannerView = document.getElementById('plannerView');
  var clientRail = document.getElementById('clientRail');
  var statusTag = document.getElementById('statusTag');
  var backBtn = document.getElementById('backBtn');
  var backLabel = document.getElementById('backLabel');
  var panel = document.getElementById('panel');
  var titleInput = document.getElementById('titleInput');
  var planTitle = document.getElementById('planTitle');
  var currentView = 'empty';

  /* ===== Meal plans tab ===== */
  var mpSearchQ = '';
  var mpSort = 'newest';

  function planPreview(plan) {
    var ids = distinctRecipeIds(plan.cells || {});
    var withPhoto = ids.filter(function (id) { return RECIPE_IMG[id]; })[0];
    return withPhoto ? RECIPE_IMG[withPhoto] : null;
  }

  function editedLabel(plan) {
    var edited = plan.editedAt && plan.editedAt !== plan.createdAt;
    return (edited ? 'Edited ' : 'Created ') + relTime(edited ? plan.editedAt : plan.createdAt);
  }

  function renderMealPlansTab() {
    var wrap = document.getElementById('mpList');
    wrap.innerHTML = '';

    var q = mpSearchQ.trim().toLowerCase();
    var rows = plans.filter(function (pl) { return !q || pl.title.toLowerCase().indexOf(q) !== -1; });

    rows.sort(function (a, b) {
      if (mpSort === 'newest') return b.createdAt - a.createdAt;
      if (mpSort === 'oldest') return a.createdAt - b.createdAt;
      if (mpSort === 'az') return a.title.localeCompare(b.title);
      if (mpSort === 'za') return b.title.localeCompare(a.title);
      return 0;
    });

    if (!rows.length) {
      wrap.innerHTML = '<div class="mp-empty">' +
        '<span class="headline">' + (q ? 'No meal plans found' : 'No meal plans yet') + '</span>' +
        '<p>' + (q ? 'Try a different search term' : 'Create a meal plan to get started') + '</p></div>';
      return;
    }

    rows.forEach(function (plan) {
      var ids = distinctRecipeIds(plan.cells || {});
      var img = planPreview(plan);
      var row = document.createElement('button');
      row.className = 'mp-row';
      row.innerHTML =
        '<span class="mp-thumb"' + (img ? ' style="background-image:url(' + img + ')"' : '') + '>' +
          (img ? '' : ico('plans', 24)) + '</span>' +
        '<span class="mp-body">' +
          '<span class="mp-title"></span>' +
          '<span class="mp-meta"></span>' +
        '</span>' +
        '<button class="icon-btn" aria-label="More options"><span data-ico="more-vertical" data-ico-size="20"></span></button>';
      row.querySelector('.mp-title').textContent = plan.title;
      row.querySelector('.mp-meta').textContent =
        '7 days \u00b7 ' + ids.length + (ids.length === 1 ? ' recipe' : ' recipes') + ' \u00b7 ' + editedLabel(plan);
      row.addEventListener('click', function () { guardExit(function () { openPlanner(plan.id, false); }); });
      row.querySelector('.icon-btn').addEventListener('click', function (e) { e.stopPropagation(); });
      wrap.appendChild(row);
    });
    /* resolve the more-vertical placeholder now that the rows exist */
    wrap.querySelectorAll('[data-ico]').forEach(function (el) {
      el.outerHTML = ico(el.dataset.ico, parseInt(el.dataset.icoSize, 10));
    });
  }

  function switchNpTab(tab) {
    document.getElementById('npTabOverview').classList.toggle('active', tab === 'overview');
    document.getElementById('npTabMealPlans').classList.toggle('active', tab === 'mealplans');
    document.getElementById('npOverviewPanel').classList.toggle('hidden', tab !== 'overview');
    document.getElementById('npMealPlansPanel').classList.toggle('hidden', tab !== 'mealplans');
    if (tab === 'mealplans') renderMealPlansTab();
  }
  document.getElementById('npTabOverview').addEventListener('click', function () { switchNpTab('overview'); });
  document.getElementById('npTabMealPlans').addEventListener('click', function () { switchNpTab('mealplans'); });
  document.getElementById('mpSearch').addEventListener('input', function (e) {
    mpSearchQ = e.target.value; renderMealPlansTab();
  });
  document.getElementById('mpSort').addEventListener('change', function (e) {
    mpSort = e.target.value; renderMealPlansTab();
  });
  document.getElementById('mpNewBtn').addEventListener('click', function () {
    guardExit(function () {
      var plan = createPlan();
      seedNewPlanPreferences();
      openPlanner(plan.id, true);
    });
  });

  function relTime(ts) {
    var mins = Math.max(1, Math.round((Date.now() - ts) / 60000));
    if (mins < 60) return mins + 'min ago';
    var hrs = Math.round(mins / 60);
    return hrs + (hrs === 1 ? 'hr' : 'hrs') + ' ago';
  }

  /* Distinct recipes within one plan's cells, in the order first used */
  function distinctRecipeIds(cells) {
    var ids = [];
    DAYS.forEach(function (day) {
      MEALS.forEach(function (meal, ri) {
        (cells[cellKey(day, ri)] || []).forEach(function (it) {
          if (ids.indexOf(it.recipeId) === -1) ids.push(it.recipeId);
        });
      });
    });
    return ids;
  }

  /* The collection is the union across every meal plan */
  function collectionRecipeIds() {
    var ids = [];
    plans.forEach(function (plan) {
      distinctRecipeIds(plan.cells || {}).forEach(function (id) {
        if (ids.indexOf(id) === -1) ids.push(id);
      });
    });
    return ids;
  }

  function renderRecipeCollection() {
    var wrap = document.getElementById('recipeCollection');
    var tag = document.getElementById('recipeCountTag');
    if (!wrap) return;
    var ids = collectionRecipeIds();
    wrap.innerHTML = '';

    tag.className = ids.length ? 'tag-count' : '';
    tag.textContent = ids.length ? ids.length + (ids.length === 1 ? ' recipe' : ' recipes') : '';

    if (!ids.length) {
      wrap.innerHTML =
        '<div class="empty-content"><p class="empty-text">' +
        '<span class="headline">No recipes yet</span>' +
        'Recipes added to meal plans will appear here automatically' +
        '</p></div>';
      return;
    }

    var grid = document.createElement('div');
    grid.className = 'rc-grid';
    ids.forEach(function (id) {
      var r = recipeById(id);
      if (!r) return;
      var card = document.createElement('button');
      card.className = 'rc-card';
      var u = RECIPE_IMG[id];
      card.innerHTML =
        '<span class="rc-img"' + (u ? ' style="background-image:url(' + u + ')"' : '') + '>' +
          (u ? '' : IC_NOIMG) + '</span>' +
        '<span class="rc-name"></span>';
      card.querySelector('.rc-name').textContent = r.name;
      card.title = r.name;
      card.addEventListener('click', function () { openRecipeInfoFromCollection(id); });
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
  }

  /* Opening from the collection has no slot waiting, so no select/swap action */
  function openRecipeInfoFromCollection(id) {
    railCtx.mode = 'info';
    railCtx.infoId = id;
    railCtx.infoFrom = null;        /* opened straight from the collection */
    railCtx.infoTab = 'Ingredients';
    pushPanel(recipeRail);
    renderRecipeRail();
  }

  function renderPlanCards() {
    var wrap = document.getElementById('planCards');
    wrap.innerHTML = '';
    plans.forEach(function (plan) {
      var card = document.createElement('button');
      card.className = 'plan-card';
      /* up to four distinct recipes from this plan's own cells */
      var ids = distinctRecipeIds(plan.cells || {});
      var pics = ids.filter(function (id) { return RECIPE_IMG[id]; }).slice(0, 4);
      var tiles = '';
      if (pics.length) {
        /* fewer than four still fills the frame rather than leaving gaps */
        var cls = pics.length === 1 ? 'p-tile wide tall'
                : pics.length === 2 ? 'p-tile tall'
                : pics.length === 3 ? 'p-tile' : 'p-tile';
        pics.forEach(function (id, i) {
          var c = cls;
          if (pics.length === 3 && i === 2) c = 'p-tile wide';
          tiles += '<span class="' + c + '" style="background-image:url(' + RECIPE_IMG[id] + ')"></span>';
        });
      }
      card.innerHTML =
        '<div class="p-image' + (pics.length ? ' has-recipes' : '') + '">' + tiles + '<span class="card-scrim"></span></div>' +
        '<div class="p-content">' +
          '<span class="p-title"></span>' +
          '<span class="p-sub">Created ' + relTime(plan.createdAt) + '</span>' +
          '<div class="card-meta">' +
            '<span class="meta-item"><span data-ico="calendar" data-ico-size="16"></span>7 days</span>' +
            '<span class="meta-item"><span data-ico="recipes" data-ico-size="16"></span>' + ids.length + (ids.length === 1 ? ' recipe' : ' recipes') + '</span>' +
          '</div>' +
        '</div>';
      card.querySelector('.p-title').textContent = plan.title;
      card.addEventListener('click', function () { guardExit(function () { openPlanner(plan.id, false); }); });
      wrap.appendChild(card);
    });
    /* cards are built after page load, so their icon placeholders need resolving now */
    wrap.querySelectorAll('[data-ico]').forEach(function (el) {
      el.outerHTML = ico(el.dataset.ico, parseInt(el.dataset.icoSize, 10));
    });
  }

  function show(view) {
    currentView = view;
    emptyView.classList.toggle('hidden', view !== 'empty');
    createdView.classList.toggle('hidden', view !== 'created');
    plannerView.classList.toggle('hidden', view !== 'planner');
    clientRail.style.display = view === 'planner' ? 'none' : 'flex';
    statusTag.classList.toggle('hidden', view === 'empty');   /* shown once a plan exists */
    backLabel.textContent = view === 'planner' ? 'Back to Nutrition Plan' : 'Back to clients';
    if (view !== 'planner') {
      setPanelVisible(false);
      popPanel(document.getElementById('exclPanel'));
      popPanel(document.getElementById('recipeRail'));
      clearCellSelection();
    }
    if (view === 'created') { switchNpTab('overview'); renderPlanCards(); renderRecipeCollection(); }
  }

  function createPlan() {
    var n = plans.length + 1;
    /* cells belong to the plan, so a new plan opens empty */
    var plan = { id: 'plan' + Date.now(), title: 'Week ' + n, createdAt: Date.now(), cells: {} };
    plans.push(plan);
    return plan;
  }

  /* Preferences are still global DOM/state rather than per-plan, so a new plan
     seeds them explicitly \u2014 from the client default if one exists, otherwise
     blank, rather than silently inheriting whatever the previous plan left behind. */
  function seedNewPlanPreferences() {
    panelMode = 'plan';
    applyDefaultsToFields(clientDefaults || emptyDefaultFields());
    savedPrefs = {
      targetOn: targetToggle.classList.contains('on'),
      calories: state.calories,
      grams: { carbs: state.grams.carbs, fat: state.grams.fat, protein: state.grams.protein },
      dietary: selectedChipLabels('dietaryChips'),
      exclusions: setToArray(exclSelected),
      cultural: selectedChipLabels('culturalChips')
    };
  }

  function openPlanner(planId, focusTitle) {
    activePlanId = planId;
    var plan = plans.find(function (p) { return p.id === planId; });
    if (!plan.cells) plan.cells = {};
    cellItems = plan.cells;          /* point the grid at this plan's data */
    redrawGrid();
    planTitle.textContent = plan.title;
    titleInput.value = plan.title;
    show('planner');
    panelMode = 'plan';
    applyPanelMode();
    setPanelVisible(true);
    renderHeaderTags();
    beginPanelEdit();
    if (focusTitle) { titleInput.focus(); titleInput.select(); }
  }

  document.getElementById('blankMealPlanCard').addEventListener('click', function () {
    guardExit(function () {
      var plan = createPlan();
      seedNewPlanPreferences();
      openPlanner(plan.id, false);
    });
  });
  document.getElementById('blankMealPlanFooter').addEventListener('click', function () {
    guardExit(function () {
      var plan = createPlan();
      seedNewPlanPreferences();
      openPlanner(plan.id, false);
    });
  });
  backBtn.addEventListener('click', function () {
    guardExit(function () {
      if (currentView === 'planner') show(plans.length ? 'created' : 'empty');
      /* on the overview, Back to clients has no destination in this prototype */
    });
  });
  document.getElementById('railNutritionPlan').addEventListener('click', function () {
    show(plans.length ? 'created' : 'empty');
  });

  /* ===== Planner grid ===== */
  /* ===== Icon library: the real PB/TCL product icons (Material outlined) =====
     Keyed by name, fills switched to currentColor, clipPath ids namespaced.
     Use ico('close', 20) rather than hand-drawing an SVG. */
  var ICON_LIB = {"certification":"<g clip-path=\"url(#certification__clip0_10446_18236)\"> <path d=\"M12 23.3L8.64995 20H3.99995V15.35L0.699951 12L3.99995 8.65001V4.00001H8.64995L12 0.700012L15.35 4.00001H20V8.65001L23.3 12L20 15.35V20H15.35L12 23.3ZM12 20.5L14.5 18H18V14.5L20.5 12L18 9.50001V6.00001H14.5L12 3.50001L9.49995 6.00001H5.99995V9.50001L3.49995 12L5.99995 14.5V18H9.49995L12 20.5ZM9.07495 16.25L12 14.475L14.925 16.25L14.15 12.925L16.75 10.675L13.325 10.4L12 7.25001L10.675 10.4L7.24995 10.675L9.84995 12.925L9.07495 16.25Z\" fill=\"currentColor\"/> </g> <defs> <clipPath id=\"certification__clip0_10446_18236\"> <rect width=\"24\" height=\"24\" fill=\"white\"/> </clipPath> </defs>","contact-emergency":"<g clip-path=\"url(#contact-emergency__clip0_10372_26565)\"> <path d=\"M9 14C10.65 14 12 12.65 12 11C12 9.35 10.65 8 9 8C7.35 8 6 9.35 6 11C6 12.65 7.35 14 9 14ZM9 10C9.54 10 10 10.46 10 11C10 11.54 9.54 12 9 12C8.46 12 8 11.54 8 11C8 10.46 8.46 10 9 10Z\" fill=\"currentColor\"/> <path d=\"M22 3H2C0.9 3 0 3.9 0 5V19C0 20.1 0.9 21 2 21H22C23.1 21 23.99 20.1 23.99 19L24 5C24 3.9 23.1 3 22 3ZM4.54 19C5.64 17.78 7.23 17 9 17C10.77 17 12.36 17.78 13.46 19H4.54ZM22 19H15.92C14.54 16.61 11.96 15 9 15C6.04 15 3.46 16.61 2.08 19H2V5H22V19Z\" fill=\"currentColor\"/> <path d=\"M15.78 11.15L17.25 10.3V12H18.75V10.3L20.22 11.15L20.97 9.85L19.5 9L20.97 8.15L20.22 6.85L18.75 7.7V6H17.25V7.7L15.78 6.85L15.03 8.15L16.5 9L15.03 9.85L15.78 11.15Z\" fill=\"currentColor\"/> </g> <defs> <clipPath id=\"contact-emergency__clip0_10372_26565\"> <rect width=\"24\" height=\"24\" fill=\"white\"/> </clipPath> </defs>","direction-right":"<g clip-path=\"url(#direction-right__clip0_10401_7978)\"> <path d=\"M16.01 11H4V13H16.01V16L20 12L16.01 8V11Z\" fill=\"currentColor\"/> </g> <defs> <clipPath id=\"direction-right__clip0_10401_7978\"> <rect width=\"24\" height=\"24\" fill=\"white\"/> </clipPath> </defs>","grid":"<g clip-path=\"url(#grid__clip0_10372_26526)\"> <path d=\"M20 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2ZM8 20H4V16H8V20ZM8 14H4V10H8V14ZM8 8H4V4H8V8ZM14 20H10V16H14V20ZM14 14H10V10H14V14ZM14 8H10V4H14V8ZM20 20H16V16H20V20ZM20 14H16V10H20V14ZM20 8H16V4H20V8Z\" fill=\"currentColor\"/> </g> <defs> <clipPath id=\"grid__clip0_10372_26526\"> <rect width=\"24\" height=\"24\" fill=\"white\"/> </clipPath> </defs>","health-care-provider":"<path d=\"M10.5 17H13.5V14.5H16V11.5H13.5V9H10.5V11.5H8V14.5H10.5V17ZM4 21V9L12 3L20 9V21H4ZM6 19H18V10L12 5.5L6 10V19Z\" fill=\"currentColor\"/>","lifestyle":"<path d=\"M15.625 4.00098C15.625 4.53141 15.4143 5.04012 15.0392 5.41519C14.6642 5.79026 14.1554 6.00098 13.625 6.00098C13.0946 6.00098 12.5859 5.79026 12.2108 5.41519C11.8357 5.04012 11.625 4.53141 11.625 4.00098C11.625 3.47054 11.8357 2.96184 12.2108 2.58676C12.5859 2.21169 13.0946 2.00098 13.625 2.00098C14.1554 2.00098 14.6642 2.21169 15.0392 2.58676C15.4143 2.96184 15.625 3.47054 15.625 4.00098ZM12.8465 14.1995L15.443 16.7615C15.5426 16.8597 15.6204 16.9778 15.6715 17.108L17.056 20.6355C17.104 20.7577 17.1275 20.8883 17.125 21.0196C17.1226 21.1509 17.0943 21.2805 17.0418 21.4008C16.9893 21.5212 16.9136 21.6301 16.819 21.7212C16.7244 21.8124 16.6128 21.884 16.4905 21.932C16.3682 21.98 16.2377 22.0034 16.1064 22.001C15.9751 21.9985 15.8455 21.9703 15.7251 21.9177C15.6048 21.8652 15.4959 21.7895 15.4048 21.6949C15.3136 21.6003 15.242 21.4887 15.194 21.3665L13.887 18.036L9.42301 13.631C9.31514 13.5246 9.23285 13.3951 9.18235 13.2523C9.13186 13.1094 9.11447 12.957 9.13151 12.8065L9.48901 9.64648C8.62701 10.5035 7.96201 11.708 7.45251 13.3045C7.41442 13.4317 7.35135 13.5501 7.26699 13.6528C7.18262 13.7554 7.07866 13.8402 6.96117 13.9022C6.84367 13.9642 6.715 14.0021 6.58268 14.0138C6.45035 14.0255 6.31701 14.0108 6.19046 13.9704C6.0639 13.93 5.94666 13.8648 5.84559 13.7786C5.74451 13.6924 5.66162 13.5869 5.60177 13.4683C5.54191 13.3497 5.50628 13.2204 5.49697 13.0878C5.48765 12.9553 5.50484 12.8223 5.54751 12.6965C6.48251 9.76648 8.03501 7.57348 10.64 6.56798L10.6515 6.56348C11.315 6.31698 12.005 6.33698 12.62 6.65448C13.2105 6.95998 13.631 7.48748 13.9065 8.07848L14.2305 8.77848C14.4745 9.30748 14.6795 9.75348 14.877 10.1445C15.1535 10.6945 15.376 11.0595 15.596 11.3155C15.8 11.5525 16.0025 11.6985 16.261 11.7995C16.539 11.908 16.9285 11.983 17.53 12.001C17.6621 12.0036 17.7924 12.0324 17.9134 12.0857C18.0343 12.1391 18.1435 12.2158 18.2346 12.3116C18.3257 12.4073 18.3969 12.5202 18.444 12.6436C18.4912 12.7671 18.5135 12.8987 18.5095 13.0308C18.5056 13.1629 18.4755 13.2929 18.4209 13.4133C18.3664 13.5337 18.2886 13.6421 18.1919 13.7322C18.0953 13.8223 17.9817 13.8924 17.8578 13.9384C17.7339 13.9843 17.6021 14.0053 17.47 14C16.7475 13.9785 16.106 13.886 15.5335 13.6625C14.942 13.4315 14.4755 13.08 14.0785 12.6175C13.8285 12.3265 13.6085 11.994 13.4035 11.6325L12.8465 14.1995Z\" fill=\"currentColor\"/> <path d=\"M9.13189 15.1113L10.7894 16.7013L10.0264 19.2748C9.96738 19.4739 9.84785 19.6497 9.68438 19.7778L7.11738 21.7893C7.01397 21.8703 6.89561 21.9302 6.76907 21.9654C6.64254 22.0007 6.51029 22.0106 6.3799 21.9948C6.2495 21.9789 6.1235 21.9375 6.0091 21.873C5.8947 21.8084 5.79413 21.722 5.71313 21.6186C5.63214 21.5152 5.57231 21.3968 5.53706 21.2703C5.50181 21.1437 5.49182 21.0115 5.50768 20.8811C5.52354 20.7507 5.56492 20.6247 5.62947 20.5103C5.69402 20.3959 5.78047 20.2953 5.88388 20.2143L8.19988 18.4003L8.89739 16.0453L9.13189 15.1113Z\" fill=\"currentColor\"/>","long-text":"<g clip-path=\"url(#long-text__clip0_10372_26596)\"> <path d=\"M4 5H20V7H4V5ZM4 9H20V11H4V9ZM4 13H20V15H4V13ZM4 17H14V19H4V17Z\" fill=\"currentColor\"/> </g> <defs> <clipPath id=\"long-text__clip0_10372_26596\"> <rect width=\"24\" height=\"24\" fill=\"white\"/> </clipPath> </defs>","mood":"<path d=\"M6 22.001V17.701C5.05 16.8343 4.31267 15.822 3.788 14.664C3.26333 13.506 3.00067 12.285 3 11.001C3 8.50098 3.875 6.37598 5.625 4.62598C7.375 2.87598 9.5 2.00098 12 2.00098C14.0833 2.00098 15.9293 2.61364 17.538 3.83898C19.1467 5.06431 20.1923 6.65998 20.675 8.62598L21.975 13.751C22.0583 14.0676 22 14.3553 21.8 14.614C21.6 14.8726 21.3333 15.0016 21 15.001H19V18.001C19 18.551 18.8043 19.022 18.413 19.414C18.0217 19.806 17.5507 20.0016 17 20.001H15V22.001H6ZM11 14.001H13V7.00098H11V14.001ZM14 12.501H16V8.00098H14V12.501ZM8 12.001H10V8.00098H8V12.001Z\" fill=\"currentColor\"/>","new-page":"<path d=\"M6 22C5.45 22 4.97933 21.8043 4.588 21.413C4.196 21.021 4 20.55 4 20V17H6V20H18V17H20V20C20 20.55 19.8043 21.021 19.413 21.413C19.021 21.8043 18.55 22 18 22H6ZM4 11V4C4 3.45 4.196 2.979 4.588 2.587C4.97933 2.19567 5.45 2 6 2H14L20 8V11H18V9H13V4H6V11H4ZM9 15V13H15V15H9ZM17 15V13H23V15H17ZM1 15V13H7V15H1Z\" fill=\"currentColor\"/>","numeric":"<g clip-path=\"url(#numeric__clip0_10372_26622)\"> <path d=\"M19 19H5V5H19M19 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3ZM12 17H14V7H10V9H12\" fill=\"currentColor\"/> </g> <defs> <clipPath id=\"numeric__clip0_10372_26622\"> <rect width=\"24\" height=\"24\" fill=\"white\"/> </clipPath> </defs>","open-window":"<path d=\"M19 19H5V5H12V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V12H19V19ZM14 3V5H17.59L7.76 14.83L9.17 16.24L19 6.41V10H21V3H14Z\" fill=\"currentColor\"/>","personal-info":"<g clip-path=\"url(#personal-info__clip0_10372_26579)\"> <path d=\"M13.17 4L18 8.83V20H6V4H13.17ZM14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14ZM16 17.43C16 16.62 15.52 15.9 14.78 15.58C13.93 15.21 12.99 15 12 15C11.01 15 10.07 15.21 9.22 15.58C8.48 15.9 8 16.62 8 17.43V18H16V17.43Z\" fill=\"currentColor\"/> </g> <defs> <clipPath id=\"personal-info__clip0_10372_26579\"> <rect width=\"24\" height=\"24\" fill=\"white\"/> </clipPath> </defs>","section-title":"<path d=\"M5 17V7H7V11H11V7H13V17H11V13H7V17H5ZM17 17V9H15V7H19V17H17Z\" fill=\"currentColor\"/>","short-text":"<g clip-path=\"url(#short-text__clip0_10372_26161)\"> <path d=\"M4 9H20V11H4V9ZM4 13H14V15H4V13Z\" fill=\"currentColor\"/> </g> <defs> <clipPath id=\"short-text__clip0_10372_26161\"> <rect width=\"24\" height=\"24\" fill=\"white\"/> </clipPath> </defs>","signature":"<path d=\"M14.075 11.725C15.2917 10.825 16.2417 9.8375 16.925 8.7625C17.6083 7.6875 17.95 6.61667 17.95 5.55C17.95 5.01667 17.8625 4.625 17.6875 4.375C17.5125 4.125 17.275 4 16.975 4C16.1917 4 15.5 4.6625 14.9 5.9875C14.3 7.3125 14 8.80833 14 10.475C14 10.7083 14.0042 10.9292 14.0125 11.1375C14.0208 11.3458 14.0417 11.5417 14.075 11.725ZM3 21V19H5V21H3ZM7 21V19H9V21H7ZM11 21V19H13V21H11ZM15 21V19H17V21H15ZM19 21V19H21V21H19ZM3.4 17L2 15.6L3.6 14L2 12.4L3.4 11L5 12.6L6.6 11L8 12.4L6.4 14L8 15.6L6.6 17L5 15.4L3.4 17ZM15.45 16C14.95 16 14.4917 15.9042 14.075 15.7125C13.6583 15.5208 13.3 15.2083 13 14.775C12.5833 15.0083 12.1542 15.2167 11.7125 15.4C11.2708 15.5833 10.8167 15.7667 10.35 15.95L9.65 14.075C10.1167 13.9083 10.5625 13.7292 10.9875 13.5375C11.4125 13.3458 11.825 13.1417 12.225 12.925C12.1417 12.5583 12.0792 12.1583 12.0375 11.725C11.9958 11.2917 11.975 10.825 11.975 10.325C11.975 7.925 12.45 5.9375 13.4 4.3625C14.35 2.7875 15.5417 2 16.975 2C17.8417 2 18.55 2.32083 19.1 2.9625C19.65 3.60417 19.925 4.5 19.925 5.65C19.925 7.08333 19.4708 8.5 18.5625 9.9C17.6542 11.3 16.3917 12.5583 14.775 13.675C14.8917 13.7917 15.0125 13.8792 15.1375 13.9375C15.2625 13.9958 15.3917 14.025 15.525 14.025C15.9583 14.025 16.4625 13.75 17.0375 13.2C17.6125 12.65 18.1333 11.925 18.6 11.025L20.425 11.875C20.3083 12.1583 20.2167 12.5 20.15 12.9C20.0833 13.3 20.0917 13.65 20.175 13.95C20.3417 13.8667 20.5375 13.725 20.7625 13.525C20.9875 13.325 21.2167 13.075 21.45 12.775L23.025 14C22.5917 14.6 22.0917 15.0833 21.525 15.45C20.9583 15.8167 20.4333 16 19.95 16C19.6 16 19.2875 15.8958 19.0125 15.6875C18.7375 15.4792 18.5083 15.1583 18.325 14.725C17.8583 15.1417 17.3833 15.4583 16.9 15.675C16.4167 15.8917 15.9333 16 15.45 16Z\" fill=\"currentColor\"/>","sleep":"<path d=\"M12.075 22C10.675 22 9.36248 21.7333 8.13748 21.2C6.91248 20.6667 5.84581 19.9458 4.93748 19.0375C4.02914 18.1292 3.30831 17.0625 2.77498 15.8375C2.24164 14.6125 1.97498 13.3 1.97498 11.9C1.97498 9.46667 2.74998 7.32083 4.29998 5.4625C5.84998 3.60417 7.82498 2.45 10.225 2C9.92498 3.65 10.0166 5.2625 10.5 6.8375C10.9833 8.4125 11.8166 9.79167 13 10.975C14.1833 12.1583 15.5625 12.9917 17.1375 13.475C18.7125 13.9583 20.325 14.05 21.975 13.75C21.5416 16.15 20.3916 18.125 18.525 19.675C16.6583 21.225 14.5083 22 12.075 22ZM12.075 20C13.5416 20 14.9 19.6333 16.15 18.9C17.4 18.1667 18.3833 17.1583 19.1 15.875C17.6666 15.7417 16.3083 15.3792 15.025 14.7875C13.7416 14.1958 12.5916 13.3917 11.575 12.375C10.5583 11.3583 9.74998 10.2083 9.14998 8.925C8.54998 7.64167 8.19164 6.28333 8.07498 4.85C6.79164 5.56667 5.78748 6.55417 5.06248 7.8125C4.33748 9.07083 3.97498 10.4333 3.97498 11.9C3.97498 14.15 4.76248 16.0625 6.33748 17.6375C7.91248 19.2125 9.82498 20 12.075 20ZM18 10L16.75 7.25L14 6L16.75 4.75L18 2L19.25 4.75L22 6L19.25 7.25L18 10Z\" fill=\"currentColor\"/>","toggle-off":"<g clip-path=\"url(#toggle-off__clip0_10372_26172)\"> <path d=\"M17 6H7C3.69 6 1 8.69 1 12C1 15.31 3.69 18 7 18H17C20.31 18 23 15.31 23 12C23 8.69 20.31 6 17 6ZM17 16H7C4.79 16 3 14.21 3 12C3 9.79 4.79 8 7 8H17C19.21 8 21 9.79 21 12C21 14.21 19.21 16 17 16ZM7 9C5.34 9 4 10.34 4 12C4 13.66 5.34 15 7 15C8.66 15 10 13.66 10 12C10 10.34 8.66 9 7 9Z\" fill=\"currentColor\"/> </g> <defs> <clipPath id=\"toggle-off__clip0_10372_26172\"> <rect width=\"24\" height=\"24\" fill=\"white\"/> </clipPath> </defs>","weight-scale":"<g clip-path=\"url(#weight-scale__clip0_10372_26537)\"> <path d=\"M14 11V8C18.56 7.42 22 4.9 22 2H2C2 4.9 5.44 7.42 10 8V11C6.32 11.73 2 14.61 2 22H8V20H4.13C5.06 13.17 10.78 12.8 12 12.8C13.22 12.8 18.94 13.17 19.87 20H16V22H22C22 14.61 17.68 11.73 14 11ZM18.87 4C17.5 5.19 15 6.12 12 6.12C9 6.12 6.5 5.19 5.13 4H18.87ZM12 22C10.9 22 10 21.1 10 20C10 19.45 10.22 18.95 10.59 18.59C11.39 17.79 16 16 16 16C16 16 14.21 20.61 13.41 21.41C13.05 21.78 12.55 22 12 22Z\" fill=\"currentColor\"/> </g> <defs> <clipPath id=\"weight-scale__clip0_10372_26537\"> <rect width=\"24\" height=\"24\" fill=\"white\"/> </clipPath> </defs>","add-file":"<path d=\"M13 11H11V14H8V16H11V19H13V16H16V14H13V11ZM14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z\" fill=\"currentColor\"/>","add":"<path d=\"M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z\" fill=\"currentColor\"/>","ai":"<path d=\"M9 4L11.5 9.5L17 12L11.5 14.5L9 20L6.5 14.5L1 12L6.5 9.5L9 4ZM9 8.83L8 11L5.83 12L8 13L9 15.17L10 13L12.17 12L10 11L9 8.83ZM19 9L17.74 6.26L15 5L17.74 3.75L19 1L20.25 3.75L23 5L20.25 6.26L19 9ZM19 23L17.74 20.26L15 19L17.74 17.75L19 15L20.25 17.75L23 19L20.25 20.26L19 23Z\" fill=\"currentColor\"/>","analytics":"<path d=\"M14.06 9.94L12 9L14.06 8.06L15 6L15.94 8.06L18 9L15.94 9.94L15 12L14.06 9.94ZM4 14L4.94 11.94L7 11L4.94 10.06L4 8L3.06 10.06L1 11L3.06 11.94L4 14ZM8.5 9L9.59 6.59L12 5.5L9.59 4.41L8.5 2L7.41 4.41L5 5.5L7.41 6.59L8.5 9ZM4.5 20.5L10.5 14.49L14.5 18.49L23 8.93L21.59 7.52L14.5 15.49L10.5 11.49L3 19L4.5 20.5Z\" fill=\"currentColor\"/>","arrow-back":"<path d=\"M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z\" fill=\"currentColor\"/>","arrow-dropdown-up":"<path d=\"M7 14L12 9L17 14H7Z\" fill=\"currentColor\"/>","arrow-dropdown":"<path d=\"M7 10L12 15L17 10H7Z\" fill=\"currentColor\"/>","attach-file":"<path d=\"M16.5 6V17.5C16.5 19.71 14.71 21.5 12.5 21.5C10.29 21.5 8.5 19.71 8.5 17.5V5C8.5 3.62 9.62 2.5 11 2.5C12.38 2.5 13.5 3.62 13.5 5V15.5C13.5 16.05 13.05 16.5 12.5 16.5C11.95 16.5 11.5 16.05 11.5 15.5V6H10V15.5C10 16.88 11.12 18 12.5 18C13.88 18 15 16.88 15 15.5V5C15 2.79 13.21 1 11 1C8.79 1 7 2.79 7 5V17.5C7 20.54 9.46 23 12.5 23C15.54 23 18 20.54 18 17.5V6H16.5Z\" fill=\"currentColor\"/>","automation":"<path d=\"M12.68 6H11.32L7 16H9L9.73 14H14.27L15 16H17L12.68 6ZM10.3 12.5L12 8L13.7 12.5H10.3ZM17.4 20.4L19 22H14V17L16 19C18.39 17.61 20 14.95 20 12C20 7.59 16.41 4 12 4C7.59 4 4 7.59 4 12C4 14.95 5.61 17.53 8 18.92V21.16C4.47 19.61 2 16.1 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12C22 15.53 20.17 18.62 17.4 20.4Z\" fill=\"currentColor\"/>","basic-information":"<path d=\"M4 6V18H20V6H4ZM10.3818 14C11.4451 14 12.4189 14.6009 12.8945 15.5537C13.141 16.0478 12.9404 16.6479 12.4463 16.8945C11.9522 17.141 11.3521 16.9404 11.1055 16.4463C10.969 16.1732 10.6885 16 10.3818 16H7.61816C7.31149 16 7.03095 16.1732 6.89453 16.4463C6.6479 16.9404 6.04781 17.141 5.55371 16.8945C5.05964 16.6479 4.85895 16.0478 5.10547 15.5537C5.58108 14.6009 6.55491 14 7.61816 14H10.3818ZM18 14C18.5523 14 19 14.4477 19 15C19 15.5523 18.5523 16 18 16H15C14.4477 16 14 15.5523 14 15C14 14.4477 14.4477 14 15 14H18ZM10 10C10 9.73478 9.89457 9.48051 9.70703 9.29297C9.51949 9.10543 9.26522 9 9 9C8.73478 9 8.48051 9.10543 8.29297 9.29297C8.10543 9.48051 8 9.73478 8 10C8 10.2652 8.10543 10.5195 8.29297 10.707C8.48051 10.8946 8.73478 11 9 11C9.26522 11 9.51949 10.8946 9.70703 10.707C9.89457 10.5195 10 10.2652 10 10ZM18 11C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H15C14.4477 13 14 12.5523 14 12C14 11.4477 14.4477 11 15 11H18ZM18 8C18.5523 8 19 8.44772 19 9C19 9.55228 18.5523 10 18 10H15C14.4477 10 14 9.55228 14 9C14 8.44772 14.4477 8 15 8H18ZM12 10C12 10.7957 11.6837 11.5585 11.1211 12.1211C10.5585 12.6837 9.79565 13 9 13C8.20435 13 7.44151 12.6837 6.87891 12.1211C6.3163 11.5585 6 10.7956 6 10C6 9.20435 6.3163 8.44152 6.87891 7.87891C7.44151 7.3163 8.20435 7 9 7C9.79565 7 10.5585 7.3163 11.1211 7.87891C11.6837 8.44151 12 9.20435 12 10ZM22 18C22 18.5304 21.7891 19.039 21.4141 19.4141C21.039 19.7891 20.5304 20 20 20H4C3.46957 20 2.96101 19.7891 2.58594 19.4141C2.21086 19.039 2 18.5304 2 18V6C2 5.46957 2.21086 4.96101 2.58594 4.58594C2.96101 4.21087 3.46957 4 4 4H20C20.5304 4 21.039 4.21087 21.4141 4.58594C21.7891 4.96101 22 5.46957 22 6V18Z\" fill=\"currentColor\"/>","booking":"<path d=\"M12 12H17V17H12V12ZM19 3H18V1H16V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 5V7H5V5H19ZM5 19V9H19V19H5Z\" fill=\"currentColor\"/>","bookmarks":"<path d=\"M19 20V3H6V1H19C19.55 1 20.021 1.19567 20.413 1.587C20.8043 1.979 21 2.45 21 3V20H19ZM5 19.95L10 17.8L15 19.95V7H5V19.95ZM3 23V7C3 6.45 3.19567 5.97933 3.587 5.588C3.979 5.196 4.45 5 5 5H15C15.55 5 16.021 5.196 16.413 5.588C16.8043 5.97933 17 6.45 17 7V23L10 20L3 23ZM5 7H15H10H5Z\" fill=\"currentColor\"/>","bowel-movement":"<path d=\"M9 22H17V19.5C19.41 17.87 21 15.12 21 12V4C21 3.46957 20.7893 2.96086 20.4142 2.58579C20.0391 2.21071 19.5304 2 19 2H15C14.4696 2 13.9609 2.21071 13.5858 2.58579C13.2107 2.96086 13 3.46957 13 4V12H3C3 15.09 5 18 9 19.5V22ZM5.29 14H18.71C18.4289 14.9411 17.9535 15.8128 17.3144 16.5586C16.6754 17.3045 15.8869 17.908 15 18.33V20H11V18.33C9 18 5.86 15.91 5.29 14ZM15 4H19V12H15V4ZM16 5V8H18V5H16Z\" fill=\"currentColor\"/>","breakfast":"<path d=\"M11 18C9.05 18 7.39583 17.3208 6.0375 15.9625C4.67917 14.6042 4 12.95 4 11V5C4 4.45 4.19583 3.97917 4.5875 3.5875C4.97917 3.19583 5.45 3 6 3H18.5C19.4667 3 20.2917 3.34167 20.975 4.025C21.6583 4.70833 22 5.53333 22 6.5C22 7.46667 21.6583 8.29167 20.975 8.975C20.2917 9.65833 19.4667 10 18.5 10H18V11C18 12.95 17.3208 14.6042 15.9625 15.9625C14.6042 17.3208 12.95 18 11 18ZM6 8H16V5H6V8ZM11 16C12.3833 16 13.5625 15.5125 14.5375 14.5375C15.5125 13.5625 16 12.3833 16 11V10H6V11C6 12.3833 6.4875 13.5625 7.4625 14.5375C8.4375 15.5125 9.61667 16 11 16ZM18 8H18.5C18.9167 8 19.2708 7.85417 19.5625 7.5625C19.8542 7.27083 20 6.91667 20 6.5C20 6.08333 19.8542 5.72917 19.5625 5.4375C19.2708 5.14583 18.9167 5 18.5 5H18V8ZM4 21V19H20V21H4Z\" fill=\"currentColor\"/>","broadcasts":"<path d=\"M20.6133 1.44739C20.7515 1.46599 20.8869 1.50212 21.0156 1.55579L21.2031 1.64857L21.377 1.76575C21.4873 1.85087 21.5862 1.94996 21.6709 2.06067L21.7871 2.2345L21.8789 2.422C21.9587 2.61524 22.0001 2.82291 22 3.03333V16.9679C21.9996 17.2479 21.926 17.5233 21.7861 17.7658C21.6461 18.0083 21.4445 18.2103 21.2021 18.3507C20.9598 18.4911 20.6844 18.5658 20.4043 18.5665C20.1241 18.5673 19.8486 18.4938 19.6055 18.3546L13.7344 15.0001H12.1533L12.667 18.5988L12.668 18.6085C12.7711 19.3868 12.5631 20.1742 12.0889 20.7999C11.6146 21.4256 10.9129 21.8393 10.1357 21.9503C9.3585 22.0614 8.56895 21.8606 7.93848 21.3927C7.30804 20.9248 6.88743 20.2273 6.76855 19.4513L6.7666 19.4415L6.12012 14.921C5.12098 14.7424 4.19242 14.2628 3.46484 13.5353C2.5272 12.5976 2.00004 11.3262 2 10.0001C2 8.67405 2.52716 7.40168 3.46484 6.46399C4.40249 5.52657 5.67411 5.00013 7 5.00013H13.7344L19.6055 1.64368L19.7939 1.55189C19.987 1.47287 20.1943 1.43218 20.4043 1.43275L20.6133 1.44739ZM8.74609 19.1574C8.78696 19.4091 8.92496 19.6351 9.12988 19.7872C9.33718 19.9411 9.59698 20.0063 9.85254 19.9699C10.1081 19.9333 10.3392 19.7977 10.4951 19.5919C10.651 19.3862 10.7195 19.1271 10.6855 18.8712V18.8702L10.1328 15.0001H8.15332L8.74609 19.1574ZM15 6.58021V13.4191L20 16.2755V3.72181L15 6.58021ZM4 10.0001C4.00004 10.7957 4.31633 11.5586 4.87891 12.1212C5.3711 12.6134 6.01652 12.9172 6.70312 12.9855L7 13.0001H13V7.00013H7C6.20435 7.00013 5.44152 7.31642 4.87891 7.87903C4.31634 8.44164 4 9.20451 4 10.0001Z\" fill=\"currentColor\"/>","calendar-add":"<path d=\"M12.075 19H5C4.45 19 3.979 18.8043 3.587 18.413C3.19567 18.021 3 17.55 3 17V6C3 5.45 3.19567 4.97933 3.587 4.588C3.979 4.196 4.45 4 5 4H6V2H8V4H14V2H16V4H17C17.55 4 18.021 4.196 18.413 4.588C18.8043 4.97933 19 5.45 19 6V12.075C18.8333 12.0417 18.671 12.0207 18.513 12.012C18.3543 12.004 18.1833 12 18 12C17.8167 12 17.646 12.004 17.488 12.012C17.3293 12.0207 17.1667 12.0417 17 12.075V9H5V17H12.075C12.0417 17.1667 12.0207 17.3293 12.012 17.488C12.004 17.646 12 17.8167 12 18C12 18.1833 12.004 18.354 12.012 18.512C12.0207 18.6707 12.0417 18.8333 12.075 19ZM17 22V19H14V17H17V14H19V17H22V19H19V22H17Z\" fill=\"currentColor\"/>","calendar-availability":"<path d=\"M5 22C4.45 22 3.979 21.8043 3.587 21.413C3.19567 21.021 3 20.55 3 20V6C3 5.45 3.19567 4.97933 3.587 4.588C3.979 4.196 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.021 4.196 20.413 4.588C20.8043 4.97933 21 5.45 21 6V20C21 20.55 20.8043 21.021 20.413 21.413C20.021 21.8043 19.55 22 19 22H5ZM5 20H19V10H5V20ZM5 8H19V6H5V8Z\" fill=\"currentColor\"/>","calendar-checkmark":"<path d=\"M10.95 18.35L7.4 14.8L8.85 13.35L10.95 15.45L15.15 11.25L16.6 12.7L10.95 18.35ZM5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6C3 5.45 3.19583 4.97917 3.5875 4.5875C3.97917 4.19583 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.0208 4.19583 20.4125 4.5875C20.8042 4.97917 21 5.45 21 6V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H5ZM5 20H19V10H5V20ZM5 8H19V6H5V8Z\" fill=\"currentColor\"/>","calendar-date-range":"<path d=\"M7 11H9V13H7V11ZM21 6V20C21 21.1 20.1 22 19 22H5C3.89 22 3 21.1 3 20L3.01 6C3.01 4.9 3.89 4 5 4H6V2H8V4H16V2H18V4H19C20.1 4 21 4.9 21 6ZM5 8H19V6H5V8ZM19 20V10H5V20H19ZM15 13H17V11H15V13ZM11 13H13V11H11V13Z\" fill=\"currentColor\"/>","calendar-today":"<path d=\"M9 16.5C8.3 16.5 7.70833 16.2583 7.225 15.775C6.74167 15.2917 6.5 14.7 6.5 14C6.5 13.3 6.74167 12.7083 7.225 12.225C7.70833 11.7417 8.3 11.5 9 11.5C9.7 11.5 10.2917 11.7417 10.775 12.225C11.2583 12.7083 11.5 13.3 11.5 14C11.5 14.7 11.2583 15.2917 10.775 15.775C10.2917 16.2583 9.7 16.5 9 16.5ZM5 22C4.45 22 3.979 21.8043 3.587 21.413C3.19567 21.021 3 20.55 3 20V6C3 5.45 3.19567 4.97933 3.587 4.588C3.979 4.196 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.021 4.196 20.413 4.588C20.8043 4.97933 21 5.45 21 6V20C21 20.55 20.8043 21.021 20.413 21.413C20.021 21.8043 19.55 22 19 22H5ZM5 20H19V10H5V20ZM5 8H19V6H5V8Z\" fill=\"currentColor\"/>","calendar-view-day":"<path d=\"M3 17H21V19H3V17ZM19 12V13H5V12H19ZM21 10H3V15H21V10ZM3 6H21V8H3V6Z\" fill=\"currentColor\"/>","calendar-view-month":"<path d=\"M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM8 11H4V6H8V11ZM14 11H10V6H14V11ZM20 11H16V6H20V11ZM8 18H4V13H8V18ZM14 18H10V13H14V18ZM20 18H16V13H20V18Z\" fill=\"currentColor\"/>","calendar-view-week":"<path d=\"M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM13 6H15.5V18H13V6ZM11 18H8.5V6H11V18ZM4 6H6.5V18H4V6ZM20 18H17.5V6H20V18Z\" fill=\"currentColor\"/>","calendar":"<path d=\"M5 22C4.45 22 3.979 21.8043 3.587 21.413C3.19567 21.021 3 20.55 3 20V6C3 5.45 3.19567 4.97933 3.587 4.588C3.979 4.196 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.021 4.196 20.413 4.588C20.8043 4.97933 21 5.45 21 6V20C21 20.55 20.8043 21.021 20.413 21.413C20.021 21.8043 19.55 22 19 22H5ZM5 20H19V10H5V20ZM5 8H19V6H5V8Z\" fill=\"currentColor\"/> <path d=\"M7 12H9V14H7V12Z\" fill=\"currentColor\"/> <path d=\"M7 16H9V18H7V16Z\" fill=\"currentColor\"/> <path d=\"M11 12H13V14H11V12Z\" fill=\"currentColor\"/> <path d=\"M11 16H13V18H11V16Z\" fill=\"currentColor\"/> <path d=\"M15 12H17V14H15V12Z\" fill=\"currentColor\"/> <path d=\"M15 16H17V18H15V16Z\" fill=\"currentColor\"/>","call-active":"<path d=\"M6.54 5C6.6 5.89 6.75 6.76 6.99 7.59L5.79 8.79C5.38 7.59 5.12 6.32 5.03 5H6.54ZM16.4 17.02C17.25 17.26 18.12 17.41 19 17.47V18.96C17.68 18.87 16.41 18.61 15.2 18.21L16.4 17.02ZM7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.51C21 15.96 20.55 15.51 20 15.51C18.76 15.51 17.55 15.31 16.43 14.94C16.33 14.9 16.22 14.89 16.12 14.89C15.86 14.89 15.61 14.99 15.41 15.18L13.21 17.38C10.38 15.93 8.06 13.62 6.62 10.79L8.82 8.59C9.1 8.31 9.18 7.92 9.07 7.57C8.7 6.45 8.5 5.25 8.5 4C8.5 3.45 8.05 3 7.5 3Z\" fill=\"currentColor\"/>","call-ended":"<path d=\"M18.59 10.52C19.64 11.03 20.63 11.67 21.55 12.43L20.48 13.5C19.9 13.03 19.27 12.61 18.6 12.23V10.52M5.4 10.52V12.22C4.75 12.59 4.12 13.01 3.53 13.49L2.46 12.42C3.37 11.67 4.36 11.04 5.4 10.52ZM12 7C7.46 7 3.34 8.78 0.29 11.67C0.11 11.85 0 12.1 0 12.38C0 12.66 0.11 12.91 0.29 13.08L2.77 15.56C2.95 15.74 3.2 15.85 3.48 15.85C3.75 15.85 4 15.75 4.18 15.57C4.97 14.84 5.86 14.21 6.84 13.72C7.17 13.56 7.4 13.21 7.4 12.82V9.72C8.85 9.25 10.4 9 12 9C13.6 9 15.15 9.25 16.59 9.73V12.83C16.59 13.23 16.82 13.57 17.15 13.73C18.13 14.22 19.03 14.84 19.82 15.58C20 15.75 20.25 15.86 20.52 15.86C20.8 15.86 21.05 15.75 21.23 15.57L23.71 13.09C23.89 12.91 24 12.66 24 12.38C24 12.1 23.89 11.85 23.71 11.67C20.66 8.78 16.54 7 12 7Z\" fill=\"currentColor\"/>","camera":"<path d=\"M14.12 4L15.95 6H20V18H4V6H8.05L9.88 4H14.12ZM15 2H9L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2ZM12 9C13.65 9 15 10.35 15 12C15 13.65 13.65 15 12 15C10.35 15 9 13.65 9 12C9 10.35 10.35 9 12 9ZM12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7Z\" fill=\"currentColor\"/>","check-circle-filled":"<path d=\"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z\" fill=\"currentColor\"/>","check-circle-outline":"<path d=\"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z\" fill=\"currentColor\"/>","checkbox-filled":"<path d=\"M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z\" fill=\"currentColor\"/>","checkbox-unchecked":"<path d=\"M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z\" fill=\"currentColor\"/>","clock":"<path d=\"M12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22C6.47 22 2 17.5 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2ZM12.5 7V12.25L17 14.92L16.25 16.15L11 13V7H12.5Z\" fill=\"currentColor\"/>","close-fullscreen":"<path d=\"M22 3.41L16.71 8.7L20 12H12V4L15.29 7.29L20.59 2L22 3.41ZM3.41 22L8.7 16.71L12 20V12H4L7.29 15.29L2 20.59L3.41 22Z\" fill=\"currentColor\"/>","close":"<path d=\"M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z\" fill=\"currentColor\"/>","cloud-save":"<path d=\"M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM19 18H6C3.79 18 2 16.21 2 14C2 11.95 3.53 10.24 5.56 10.03L6.63 9.92L7.13 8.97C8.08 7.14 9.94 6 12 6C14.62 6 16.88 7.86 17.39 10.43L17.69 11.93L19.22 12.04C20.78 12.14 22 13.45 22 15C22 16.65 20.65 18 19 18ZM10 14.18L7.91 12.09L6.5 13.5L10 17L16.01 10.99L14.6 9.58L10 14.18Z\" fill=\"currentColor\"/>","code-snippet":"<path d=\"M9.4 16.6L4.8 12L9.4 7.4L8 6L2 12L8 18L9.4 16.6ZM14.6 16.6L19.2 12L14.6 7.4L16 6L22 12L16 18L14.6 16.6Z\" fill=\"currentColor\"/>","collections":"<path d=\"M8 16H20V4H18V11L15.5 9.5L13 11V4H8V16ZM8 18C7.45 18 6.97917 17.8042 6.5875 17.4125C6.19583 17.0208 6 16.55 6 16V4C6 3.45 6.19583 2.97917 6.5875 2.5875C6.97917 2.19583 7.45 2 8 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V16C22 16.55 21.8042 17.0208 21.4125 17.4125C21.0208 17.8042 20.55 18 20 18H8ZM4 22C3.45 22 2.97917 21.8042 2.5875 21.4125C2.19583 21.0208 2 20.55 2 20V6H4V20H18V22H4Z\" fill=\"currentColor\"/>","color-picker":"<path d=\"M12 22C6.49 22 2 17.51 2 12C2 6.49 6.49 2 12 2C17.51 2 22 6.04 22 11C22 14.31 19.31 17 16 17H14.23C13.95 17 13.73 17.22 13.73 17.5C13.73 17.62 13.78 17.73 13.86 17.83C14.27 18.3 14.5 18.89 14.5 19.5C14.5 20.88 13.38 22 12 22ZM12 4C7.59 4 4 7.59 4 12C4 16.41 7.59 20 12 20C12.28 20 12.5 19.78 12.5 19.5C12.5 19.34 12.42 19.22 12.36 19.15C11.95 18.69 11.73 18.1 11.73 17.5C11.73 16.12 12.85 15 14.23 15H16C18.21 15 20 13.21 20 11C20 7.14 16.41 4 12 4Z\" fill=\"currentColor\"/> <path d=\"M6.5 13C7.32843 13 8 12.3284 8 11.5C8 10.6716 7.32843 10 6.5 10C5.67157 10 5 10.6716 5 11.5C5 12.3284 5.67157 13 6.5 13Z\" fill=\"currentColor\"/> <path d=\"M9.5 9C10.3284 9 11 8.32843 11 7.5C11 6.67157 10.3284 6 9.5 6C8.67157 6 8 6.67157 8 7.5C8 8.32843 8.67157 9 9.5 9Z\" fill=\"currentColor\"/> <path d=\"M14.5 9C15.3284 9 16 8.32843 16 7.5C16 6.67157 15.3284 6 14.5 6C13.6716 6 13 6.67157 13 7.5C13 8.32843 13.6716 9 14.5 9Z\" fill=\"currentColor\"/> <path d=\"M17.5 13C18.3284 13 19 12.3284 19 11.5C19 10.6716 18.3284 10 17.5 10C16.6716 10 16 10.6716 16 11.5C16 12.3284 16.6716 13 17.5 13Z\" fill=\"currentColor\"/>","community":"<path d=\"M11.62 4.56C11.62 4.56 11.62 4.64 11.62 4.68C11.62 4.81 11.59 4.93 11.58 5.06C11.73 5.05 11.89 5.04 12.05 5.04C13.93 5.04 15.54 5.7 16.84 7C17.42 7.58 17.86 8.22 18.18 8.92C18.38 8.94 18.58 8.96 18.78 9C19.32 9.13 19.83 9.35 20.27 9.65C20.5 9.8 20.71 9.98 20.9 10.17C20.78 9.52 20.6 8.88 20.34 8.28C19.87 7.19 19.23 6.23 18.42 5.42C17.61 4.62 16.65 3.97 15.56 3.5C14.22 2.92 12.7 2.7 11.22 2.84C11.29 2.99 11.34 3.16 11.39 3.32C11.51 3.72 11.59 4.13 11.61 4.56H11.62Z\" fill=\"currentColor\"/> <path d=\"M5.95 14.73H3.55C3.62 14.92 3.69 15.12 3.77 15.31C4.24 16.39 4.88 17.35 5.69 18.16C6.5 18.97 7.46 19.61 8.55 20.09C9.26 20.39 10.01 20.59 10.78 20.7V19.96C10.78 19.79 10.81 19.42 10.94 18.96C10.98 18.81 11.03 18.65 11.1 18.48C9.63 18.29 8.34 17.66 7.27 16.58C6.71 16.02 6.27 15.4 5.95 14.73Z\" fill=\"currentColor\"/> <path d=\"M9.51 8.5C8.82 8.3 8.01 8.2 7.08 8.2C6.15 8.2 5.34 8.3 4.65 8.5C3.8 8.75 3.13 9.13 2.67 9.67C2.01 10.42 2 11.18 2 11.21V12.85H12.16V11.21C12.16 11.21 12.15 10.42 11.49 9.67C11.03 9.13 10.36 8.75 9.51 8.5ZM7.08 10.1C8.8 10.1 9.74 10.51 10.1 10.95H4.06C4.39 10.58 5.28 10.1 7.08 10.1Z\" fill=\"currentColor\"/> <path d=\"M7.08 7.35C8.55 7.35 9.75 6.15 9.75 4.68C9.75 3.21 8.55 2 7.08 2C5.61 2 4.41 3.2 4.41 4.68C4.41 6.16 5.61 7.35 7.08 7.35ZM7.08 3.91C7.5 3.91 7.85 4.25 7.85 4.68C7.85 5.11 7.5 5.45 7.08 5.45C6.66 5.45 6.31 5.1 6.31 4.68C6.31 4.26 6.66 3.91 7.08 3.91Z\" fill=\"currentColor\"/> <path d=\"M22.15 18.41C21.69 17.87 21.02 17.49 20.17 17.24C19.48 17.05 18.68 16.94 17.74 16.94C16.8 16.94 16 17.05 15.31 17.24C14.46 17.49 13.79 17.87 13.33 18.41C12.67 19.16 12.66 19.92 12.66 19.96V21.6H22.82V19.96C22.82 19.96 22.82 19.16 22.15 18.41ZM17.74 18.84C19.47 18.84 20.41 19.26 20.77 19.69H14.72C15.05 19.32 15.95 18.84 17.74 18.84Z\" fill=\"currentColor\"/> <path d=\"M17.74 10.75C16.27 10.75 15.07 11.94 15.07 13.42C15.07 14.9 16.27 16.09 17.74 16.09C19.21 16.09 20.41 14.89 20.41 13.42C20.41 11.95 19.21 10.75 17.74 10.75ZM17.74 14.19C17.32 14.19 16.97 13.84 16.97 13.42C16.97 13 17.32 12.65 17.74 12.65C18.16 12.65 18.51 12.99 18.51 13.42C18.51 13.85 18.16 14.19 17.74 14.19Z\" fill=\"currentColor\"/>","company-profile":"<path d=\"M21.008 3C21.556 3 22 3.445 22 3.993V20.007C21.9982 20.2696 21.8931 20.521 21.7075 20.7068C21.5219 20.8926 21.2706 20.9979 21.008 21H2.992C2.72881 20.9997 2.4765 20.895 2.29049 20.7088C2.10448 20.5226 2 20.2702 2 20.007V3.993C2.00183 3.73038 2.1069 3.47902 2.29251 3.29322C2.47813 3.10742 2.72938 3.00209 2.992 3H21.008ZM20 5H4V19H20V5ZM18 15V17H6V15H18ZM12 7V13H6V7H12ZM18 11V13H14V11H18ZM10 9H8V11H10V9ZM18 7V9H14V7H18Z\" fill=\"currentColor\"/>","compare-arrows":"<path d=\"M8 20L6.6 18.575L9.175 16H2V14H9.175L6.6 11.425L8 10L13 15L8 20ZM16 14L11 9L16 4L17.4 5.425L14.825 8H22V10H14.825L17.4 12.575L16 14Z\" fill=\"currentColor\"/>","compliance":"<path d=\"M4 21C3.45 21 2.97933 20.8043 2.588 20.413C2.196 20.021 2 19.55 2 19V5C2 4.45 2.196 3.979 2.588 3.587C2.97933 3.19567 3.45 3 4 3H20C20.55 3 21.021 3.19567 21.413 3.587C21.8043 3.979 22 4.45 22 5V19C22 19.55 21.8043 20.021 21.413 20.413C21.021 20.8043 20.55 21 20 21H4ZM4 19H20V5H4V19ZM5 17H10V15H5V17ZM14.55 15L19.5 10.05L18.075 8.625L14.55 12.175L13.125 10.75L11.725 12.175L14.55 15ZM5 13H10V11H5V13ZM5 9H10V7H5V9Z\" fill=\"currentColor\"/>","content-copy":"<path d=\"M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z\" fill=\"currentColor\"/>","credit-card":"<path d=\"M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z\" fill=\"currentColor\"/>","customize":"<path d=\"M19.2749 19.8L19.9749 19.1L11.9999 11.125C12.3166 10.7417 12.5626 10.3083 12.7379 9.82499C12.9126 9.34165 12.9999 8.83332 12.9999 8.29999C12.9999 7.04999 12.5626 5.99165 11.6879 5.12499C10.8126 4.25832 9.7499 3.82499 8.4999 3.82499H8.2499L11.3249 6.89999L7.0749 11.125L3.9999 8.04999V8.32499C3.9999 9.57499 4.43724 10.6333 5.3119 11.5C6.18724 12.3667 7.2499 12.8 8.4999 12.8C9.03324 12.8 9.53757 12.7123 10.0129 12.537C10.4876 12.3623 10.9166 12.1167 11.2999 11.8L19.2749 19.8ZM17.8749 21.225L10.9749 14.325C10.5916 14.475 10.1959 14.5917 9.7879 14.675C9.37924 14.7583 8.95824 14.8 8.5249 14.8C6.70824 14.8 5.1709 14.1707 3.9129 12.912C2.65424 11.654 2.0249 10.1167 2.0249 8.29999C2.0249 7.59999 2.12924 6.92499 2.3379 6.27499C2.5459 5.62499 2.8499 5.02499 3.2499 4.47499L7.0749 8.29999L8.4999 6.89999L4.6749 3.04999C5.24157 2.63332 5.8499 2.32065 6.4999 2.11199C7.1499 1.90399 7.81657 1.79999 8.4999 1.79999C10.3166 1.79999 11.8542 2.42899 13.1129 3.68699C14.3709 4.94565 14.9999 6.48332 14.9999 8.29999C14.9999 8.73332 14.9582 9.16232 14.8749 9.58699C14.7916 10.0123 14.6666 10.4167 14.4999 10.8L21.3749 17.675C21.7582 18.0583 21.9542 18.529 21.9629 19.087C21.9709 19.6457 21.7832 20.1167 21.3999 20.5L20.7249 21.2C20.3416 21.6 19.8706 21.804 19.3119 21.812C18.7539 21.8207 18.2749 21.625 17.8749 21.225Z\" fill=\"currentColor\"/>","danger-alt":"<path d=\"M8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22C10.6167 22 9.31667 21.7375 8.1 21.2125ZM12 20C12.9 20 13.7667 19.8542 14.6 19.5625C15.4333 19.2708 16.2 18.85 16.9 18.3L5.7 7.1C5.15 7.8 4.72917 8.56667 4.4375 9.4C4.14583 10.2333 4 11.1 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20ZM18.3 16.9C18.85 16.2 19.2708 15.4333 19.5625 14.6C19.8542 13.7667 20 12.9 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C11.1 4 10.2333 4.14583 9.4 4.4375C8.56667 4.72917 7.8 5.15 7.1 5.7L18.3 16.9Z\" fill=\"currentColor\"/>","danger-warning":"<path d=\"M12 5.99L19.53 19H4.47L12 5.99ZM12 2L1 21H23L12 2ZM13 16H11V18H13V16ZM13 10H11V14H13V10Z\" fill=\"currentColor\"/>","dashboard":"<path d=\"M13 9V3H21V9H13ZM3 13V3H11V13H3ZM13 21V11H21V21H13ZM3 21V15H11V21H3ZM5 11H9V5H5V11ZM15 19H19V13H15V19ZM15 7H19V5H15V7ZM5 19H9V17H5V19Z\" fill=\"currentColor\"/>","disclaimers":"<path d=\"M8 12V10H16V12H8ZM8 8V6H16V8H8ZM6 14H13.5C13.9833 14 14.4333 14.104 14.85 14.312C15.2667 14.5207 15.6167 14.8167 15.9 15.2L18 17.95V4H6V14ZM6 20H17.05L14.325 16.425C14.225 16.2917 14.1043 16.1877 13.963 16.113C13.821 16.0377 13.6667 16 13.5 16H6V20ZM18 22H6C5.45 22 4.97933 21.8043 4.588 21.413C4.196 21.021 4 20.55 4 20V4C4 3.45 4.196 2.979 4.588 2.587C4.97933 2.19567 5.45 2 6 2H18C18.55 2 19.021 2.19567 19.413 2.587C19.8043 2.979 20 3.45 20 4V20C20 20.55 19.8043 21.021 19.413 21.413C19.021 21.8043 18.55 22 18 22Z\" fill=\"currentColor\"/>","documents-share":"<path d=\"M20.1147 6H12L9.97129 4H3.88525C2.76947 4 1.86671 4.9 1.86671 6L1.85657 18C1.85657 19.1 2.76947 20 3.88525 20H20.1147C21.2305 20 22.1434 19.1 22.1434 18V8C22.1434 6.9 21.2305 6 20.1147 6ZM20.1147 18H3.88525V6H9.12939L11.1581 8H20.1147V18ZM15.043 13C16.1588 13 17.0717 12.1 17.0717 11C17.0717 9.9 16.1588 9 15.043 9C13.9272 9 13.0143 9.9 13.0143 11C13.0143 12.1 13.9272 13 15.043 13ZM10.9856 17H19.1004V16C19.1004 14.67 16.3921 14 15.043 14C13.6939 14 10.9856 14.67 10.9856 16V17Z\" fill=\"currentColor\"/>","documents":"<path d=\"M9.17 6L11.17 8H20V18H4V6H9.17ZM10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10 4Z\" fill=\"currentColor\"/>","done":"<path d=\"M8.9999 16.2L4.7999 12L3.3999 13.4L8.9999 19L20.9999 6.99998L19.5999 5.59998L8.9999 16.2Z\" fill=\"currentColor\"/>","double-arrow-left":"<path d=\"M17.59 18L19 16.59L14.42 12L19 7.41L17.59 6L11.59 12L17.59 18Z\" fill=\"currentColor\"/> <path d=\"M11 18L12.41 16.59L7.83 12L12.41 7.41L11 6L5 12L11 18Z\" fill=\"currentColor\"/>","double-arrow-right":"<path d=\"M6.41 6L5 7.41L9.58 12L5 16.59L6.41 18L12.41 12L6.41 6Z\" fill=\"currentColor\"/> <path d=\"M13 6L11.59 7.41L16.17 12L11.59 16.59L13 18L19 12L13 6Z\" fill=\"currentColor\"/>","double-check":"<path d=\"M4.76123 13.9185L1.94031 11.2104L1 12.1131L4.76123 15.7238L12.821 7.98644L11.8807 7.08374L4.76123 13.9185Z\" fill=\"#219EC4\"/> <path d=\"M14.3628 13.9185L11.5419 11.2104L10.6016 12.1131L14.3628 15.7238L22.4226 7.98644L21.4823 7.08374L14.3628 13.9185Z\" fill=\"#219EC4\"/>","download":"<path d=\"M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z\" fill=\"currentColor\"/>","drag":"<path d=\"M9 20C8.45 20 7.97917 19.8042 7.5875 19.4125C7.19583 19.0208 7 18.55 7 18C7 17.45 7.19583 16.9792 7.5875 16.5875C7.97917 16.1958 8.45 16 9 16C9.55 16 10.0208 16.1958 10.4125 16.5875C10.8042 16.9792 11 17.45 11 18C11 18.55 10.8042 19.0208 10.4125 19.4125C10.0208 19.8042 9.55 20 9 20ZM15 20C14.45 20 13.9792 19.8042 13.5875 19.4125C13.1958 19.0208 13 18.55 13 18C13 17.45 13.1958 16.9792 13.5875 16.5875C13.9792 16.1958 14.45 16 15 16C15.55 16 16.0208 16.1958 16.4125 16.5875C16.8042 16.9792 17 17.45 17 18C17 18.55 16.8042 19.0208 16.4125 19.4125C16.0208 19.8042 15.55 20 15 20ZM9 14C8.45 14 7.97917 13.8042 7.5875 13.4125C7.19583 13.0208 7 12.55 7 12C7 11.45 7.19583 10.9792 7.5875 10.5875C7.97917 10.1958 8.45 10 9 10C9.55 10 10.0208 10.1958 10.4125 10.5875C10.8042 10.9792 11 11.45 11 12C11 12.55 10.8042 13.0208 10.4125 13.4125C10.0208 13.8042 9.55 14 9 14ZM15 14C14.45 14 13.9792 13.8042 13.5875 13.4125C13.1958 13.0208 13 12.55 13 12C13 11.45 13.1958 10.9792 13.5875 10.5875C13.9792 10.1958 14.45 10 15 10C15.55 10 16.0208 10.1958 16.4125 10.5875C16.8042 10.9792 17 11.45 17 12C17 12.55 16.8042 13.0208 16.4125 13.4125C16.0208 13.8042 15.55 14 15 14ZM9 8C8.45 8 7.97917 7.80417 7.5875 7.4125C7.19583 7.02083 7 6.55 7 6C7 5.45 7.19583 4.97917 7.5875 4.5875C7.97917 4.19583 8.45 4 9 4C9.55 4 10.0208 4.19583 10.4125 4.5875C10.8042 4.97917 11 5.45 11 6C11 6.55 10.8042 7.02083 10.4125 7.4125C10.0208 7.80417 9.55 8 9 8ZM15 8C14.45 8 13.9792 7.80417 13.5875 7.4125C13.1958 7.02083 13 6.55 13 6C13 5.45 13.1958 4.97917 13.5875 4.5875C13.9792 4.19583 14.45 4 15 4C15.55 4 16.0208 4.19583 16.4125 4.5875C16.8042 4.97917 17 5.45 17 6C17 6.55 16.8042 7.02083 16.4125 7.4125C16.0208 7.80417 15.55 8 15 8Z\" fill=\"currentColor\"/>","edit":"<path d=\"M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM5.92 19H5V18.08L14.06 9.02L14.98 9.94L5.92 19ZM20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3C17.4 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63Z\" fill=\"currentColor\"/>","emoji-emotions":"<path d=\"M15.5 11C16.3284 11 17 10.3284 17 9.5C17 8.67157 16.3284 8 15.5 8C14.6716 8 14 8.67157 14 9.5C14 10.3284 14.6716 11 15.5 11Z\" fill=\"currentColor\"/> <path d=\"M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z\" fill=\"currentColor\"/> <path d=\"M12 18C14.28 18 16.22 16.34 17 14H7C7.78 16.34 9.72 18 12 18Z\" fill=\"currentColor\"/> <path d=\"M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z\" fill=\"currentColor\"/>","error-alt":"<path d=\"M11 15H13V17H11V15ZM11 7H13V13H11V7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z\" fill=\"currentColor\"/>","error":"<path d=\"M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8ZM12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z\" fill=\"currentColor\"/>","event-repeat":"<path d=\"M5 22C4.45 22 3.979 21.8043 3.587 21.413C3.19567 21.021 3 20.55 3 20V6C3 5.45 3.19567 4.97933 3.587 4.588C3.979 4.196 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.021 4.196 20.413 4.588C20.8043 4.97933 21 5.45 21 6V12H19V10H5V20H12V22H5ZM19 24C17.7833 24 16.7207 23.621 15.812 22.863C14.904 22.1043 14.3333 21.15 14.1 20H15.65C15.8667 20.7333 16.2793 21.3333 16.888 21.8C17.496 22.2667 18.2 22.5 19 22.5C19.9667 22.5 20.7917 22.1583 21.475 21.475C22.1583 20.7917 22.5 19.9667 22.5 19C22.5 18.0333 22.1583 17.2083 21.475 16.525C20.7917 15.8417 19.9667 15.5 19 15.5C18.5167 15.5 18.0667 15.5873 17.65 15.762C17.2333 15.9373 16.8667 16.1833 16.55 16.5H18V18H14V14H15.5V15.425C15.95 14.9917 16.475 14.6457 17.075 14.387C17.675 14.129 18.3167 14 19 14C20.3833 14 21.5627 14.4877 22.538 15.463C23.5127 16.4377 24 17.6167 24 19C24 20.3833 23.5127 21.5627 22.538 22.538C21.5627 23.5127 20.3833 24 19 24ZM5 8H19V6H5V8Z\" fill=\"currentColor\"/>","event":"<path d=\"M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8ZM12 13H17V18H12V13Z\" fill=\"currentColor\"/>","export":"<path d=\"M23 12L19 8V11H10V13H19V16M1 18V6C1 5.46957 1.21071 4.96086 1.58579 4.58579C1.96086 4.21071 2.46957 4 3 4H15C15.5304 4 16.0391 4.21071 16.4142 4.58579C16.7893 4.96086 17 5.46957 17 6V9H15V6H3V18H15V15H17V18C17 18.5304 16.7893 19.0391 16.4142 19.4142C16.0391 19.7893 15.5304 20 15 20H3C2.46957 20 1.96086 19.7893 1.58579 19.4142C1.21071 19.0391 1 18.5304 1 18Z\" fill=\"currentColor\"/>","external-calendar":"<path d=\"M15 22V20H19V10H5V14H3V6C3 5.45 3.19583 4.97917 3.5875 4.5875C3.97917 4.19583 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.0208 4.19583 20.4125 4.5875C20.8042 4.97917 21 5.45 21 6V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H15ZM8 24L6.6 22.6L9.175 20H1V18H9.175L6.6 15.4L8 14L13 19L8 24ZM5 8H19V6H5V8Z\" fill=\"currentColor\"/>","fax":"<path d=\"M5 21C4.16667 21 3.45833 20.7083 2.875 20.125C2.29167 19.5417 2 18.8333 2 18V11C2 10.1667 2.29167 9.45833 2.875 8.875C3.45833 8.29167 4.16667 8 5 8C5.45 8 5.86267 8.09167 6.238 8.275C6.61333 8.45833 6.94233 8.7 7.225 9H8V4H18V9H19C19.8333 9 20.5417 9.29167 21.125 9.875C21.7083 10.4583 22 11.1667 22 12V20H7.225C6.94167 20.3 6.61267 20.5417 6.238 20.725C5.86333 20.9083 5.45067 21 5 21ZM5 19C5.28333 19 5.521 18.904 5.713 18.712C5.905 18.52 6.00067 18.2827 6 18V11C6 10.7167 5.904 10.4793 5.712 10.288C5.52 10.0967 5.28267 10.0007 5 10C4.71667 10 4.47933 10.096 4.288 10.288C4.09667 10.48 4.00067 10.7173 4 11V18C4 18.2833 4.096 18.521 4.288 18.713C4.48 18.905 4.71733 19.0007 5 19ZM10 9H16V6H10V9ZM8 18H20V12C20 11.7167 19.904 11.4793 19.712 11.288C19.52 11.0967 19.2827 11.0007 19 11H8V18ZM15 14C15.2833 14 15.521 13.904 15.713 13.712C15.905 13.52 16.0007 13.2827 16 13C16 12.7167 15.904 12.4793 15.712 12.288C15.52 12.0967 15.2827 12.0007 15 12C14.7167 12 14.4793 12.096 14.288 12.288C14.0967 12.48 14.0007 12.7173 14 13C14 13.2833 14.096 13.521 14.288 13.713C14.48 13.905 14.7173 14.0007 15 14ZM18 14C18.2833 14 18.521 13.904 18.713 13.712C18.905 13.52 19.0007 13.2827 19 13C19 12.7167 18.904 12.4793 18.712 12.288C18.52 12.0967 18.2827 12.0007 18 12C17.7167 12 17.4793 12.096 17.288 12.288C17.0967 12.48 17.0007 12.7173 17 13C17 13.2833 17.096 13.521 17.288 13.713C17.48 13.905 17.7173 14.0007 18 14ZM15 17C15.2833 17 15.521 16.904 15.713 16.712C15.905 16.52 16.0007 16.2827 16 16C16 15.7167 15.904 15.4793 15.712 15.288C15.52 15.0967 15.2827 15.0007 15 15C14.7167 15 14.4793 15.096 14.288 15.288C14.0967 15.48 14.0007 15.7173 14 16C14 16.2833 14.096 16.521 14.288 16.713C14.48 16.905 14.7173 17.0007 15 17ZM18 17C18.2833 17 18.521 16.904 18.713 16.712C18.905 16.52 19.0007 16.2827 19 16C19 15.7167 18.904 15.4793 18.712 15.288C18.52 15.0967 18.2827 15.0007 18 15C17.7167 15 17.4793 15.096 17.288 15.288C17.0967 15.48 17.0007 15.7173 17 16C17 16.2833 17.096 16.521 17.288 16.713C17.48 16.905 17.7173 17.0007 18 17ZM9 17H13V12H9V17Z\" fill=\"currentColor\"/>","file":"<path d=\"M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H14V8H18V20ZM12 17C10.9 17 10 16.1 10 15V9.5C10 9.22 10.22 9 10.5 9C10.78 9 11 9.22 11 9.5V15H13V9.5C13 8.12 11.88 7 10.5 7C9.12 7 8 8.12 8 9.5V15C8 17.21 9.79 19 12 19C14.21 19 16 17.21 16 15V11H14V15C14 16.1 13.1 17 12 17Z\" fill=\"currentColor\"/>","filter":"<path d=\"M6.99999 6H17L11.99 12.3L6.99999 6ZM4.24999 5.61C6.26999 8.2 9.99999 13 9.99999 13V19C9.99999 19.55 10.45 20 11 20H13C13.55 20 14 19.55 14 19V13C14 13 17.72 8.2 19.74 5.61C20.25 4.95 19.78 4 18.95 4H5.03999C4.20999 4 3.73999 4.95 4.24999 5.61Z\" fill=\"currentColor\"/>","flag":"<path d=\"M5 22V3H21L19 8L21 13H7V22H5ZM7 11H18.05L16.85 8L18.05 5H7V11Z\" fill=\"currentColor\"/>","food-database":"<path d=\"M12 5.5L18 10V19H6V10L12 5.5ZM12 3L4 9V21H20V9L12 3ZM11.5 9.5V12.5H11V9.5H10V12.5H9.5V9.5H8.5V12.5C8.5 13.33 9.17 14 10 14V18H11V14C11.83 14 12.5 13.33 12.5 12.5V9.5H11.5ZM13 11.5V14.5H14V18H15V9.5C13.9 9.5 13 10.4 13 11.5Z\" fill=\"currentColor\"/>","food":"<path d=\"M20 10.0001C19.3146 8.83021 18.2046 7.96957 16.9009 7.59708C15.5972 7.2246 14.2 7.36892 13 8.00005V3.00005H11V8.00005C9.79999 7.36892 8.40287 7.2246 7.09917 7.59708C5.79546 7.96957 4.68548 8.83021 4.00002 10.0001C2.00002 13.0001 7.00002 22 9.00002 22C11 22 11 21 12 21C13 21 13 22 15 22C17 22 22 13.0001 20 10.0001ZM18.25 13.3801C17.63 15.8501 16.41 18.12 14.7 20C14.5 20 14.27 19.9 14.1 19.75C13.5056 19.2695 12.7644 19.0073 12 19.0073C11.2356 19.0073 10.4944 19.2695 9.90002 19.75C9.73002 19.9 9.50002 20 9.30002 20C7.5864 18.1255 6.36639 15.8539 5.75002 13.3901C5.50002 12.6601 5.45002 11.8701 5.66002 11.1201C5.94464 10.6126 6.35581 10.1874 6.8535 9.88603C7.35118 9.58461 7.91843 9.41719 8.50002 9.40005C9.06002 9.41005 9.61002 9.54005 10.11 9.79005L11 10.2401H13L13.89 9.79005C14.39 9.54005 14.94 9.41005 15.5 9.40005C16.68 9.43005 17.76 10.0801 18.34 11.1101C18.55 11.8601 18.5 12.6501 18.25 13.3801ZM11 5.00005C5.38002 8.07005 4.11002 3.78005 4.11002 3.78005C4.11002 3.78005 6.77002 0.190051 11 5.00005Z\" fill=\"currentColor\"/>","format-align-center":"<path d=\"M7 15V17H17V15H7ZM3 21H21V19H3V21ZM3 13H21V11H3V13ZM7 7V9H17V7H7ZM3 3V5H21V3H3Z\" fill=\"currentColor\"/>","format-align-justify":"<path d=\"M3 21H21V19H3V21ZM3 17H21V15H3V17ZM3 13H21V11H3V13ZM3 9H21V7H3V9ZM3 3V5H21V3H3Z\" fill=\"currentColor\"/>","format-align-left":"<path d=\"M15 15H3V17H15V15ZM15 7H3V9H15V7ZM3 13H21V11H3V13ZM3 21H21V19H3V21ZM3 3V5H21V3H3Z\" fill=\"currentColor\"/>","format-align-right":"<path d=\"M3 21H21V19H3V21ZM9 17H21V15H9V17ZM3 13H21V11H3V13ZM9 9H21V7H9V9ZM3 3V5H21V3H3Z\" fill=\"currentColor\"/>","format-bold":"<path d=\"M15.6 10.79C16.57 10.12 17.25 9.02 17.25 8C17.25 5.74 15.5 4 13.25 4H7V18H14.04C16.13 18 17.75 16.3 17.75 14.21C17.75 12.69 16.89 11.39 15.6 10.79ZM10 6.5H13C13.83 6.5 14.5 7.17 14.5 8C14.5 8.83 13.83 9.5 13 9.5H10V6.5ZM13.5 15.5H10V12.5H13.5C14.33 12.5 15 13.17 15 14C15 14.83 14.33 15.5 13.5 15.5Z\" fill=\"currentColor\"/>","format-clear":"<path d=\"M20 7.99999V4.99999H6.39L9.39 7.99999H11.22L10.67 9.27998L12.76 11.38L14.21 7.99999H20ZM3.41 4.85999L2 6.26999L8.97 13.24L6.5 19H9.5L11.07 15.34L16.73 21L18.14 19.59L3.41 4.85999Z\" fill=\"currentColor\"/>","format-indent-decrease":"<path d=\"M11 17H21V15H11V17ZM3 12L7 16V8L3 12ZM3 21H21V19H3V21ZM3 3V5H21V3H3ZM11 9H21V7H11V9ZM11 13H21V11H11V13Z\" fill=\"currentColor\"/>","format-indent-increase":"<path d=\"M3 21H21V19H3V21ZM3 8V16L7 12L3 8ZM11 17H21V15H11V17ZM3 3V5H21V3H3ZM11 9H21V7H11V9ZM11 13H21V11H11V13Z\" fill=\"currentColor\"/>","format-italic":"<path d=\"M10 4V7H12.21L8.79 15H6V18H14V15H11.79L15.21 7H18V4H10Z\" fill=\"currentColor\"/>","format-list-bulleted":"<path d=\"M4 10.5C3.17 10.5 2.5 11.17 2.5 12C2.5 12.83 3.17 13.5 4 13.5C4.83 13.5 5.5 12.83 5.5 12C5.5 11.17 4.83 10.5 4 10.5ZM4 4.5C3.17 4.5 2.5 5.17 2.5 6C2.5 6.83 3.17 7.5 4 7.5C4.83 7.5 5.5 6.83 5.5 6C5.5 5.17 4.83 4.5 4 4.5ZM4 16.5C3.17 16.5 2.5 17.18 2.5 18C2.5 18.82 3.18 19.5 4 19.5C4.82 19.5 5.5 18.82 5.5 18C5.5 17.18 4.83 16.5 4 16.5ZM7 19H21V17H7V19ZM7 13H21V11H7V13ZM7 5V7H21V5H7Z\" fill=\"currentColor\"/>","format-list-numbered":"<path d=\"M2 17H4V17.5H3V18.5H4V19H2V20H5V16H2V17ZM3 8H4V4H2V5H3V8ZM2 11H3.8L2 13.1V14H5V13H3.2L5 10.9V10H2V11ZM7 5V7H21V5H7ZM7 19H21V17H7V19ZM7 13H21V11H7V13Z\" fill=\"currentColor\"/>","format-size":"<path d=\"M9 4V7H14V19H17V7H22V4H9ZM3 12H6V19H9V12H12V9H3V12Z\" fill=\"currentColor\"/>","format-strikethrough":"<path d=\"M10 19H14V16H10V19ZM5 4V7H10V10H14V7H19V4H5ZM3 14H21V12H3V14Z\" fill=\"currentColor\"/>","format-underlined":"<path d=\"M12 17C15.31 17 18 14.31 18 11V3H15.5V11C15.5 12.93 13.93 14.5 12 14.5C10.07 14.5 8.5 12.93 8.5 11V3H6V11C6 14.31 8.69 17 12 17ZM5 19V21H19V19H5Z\" fill=\"currentColor\"/>","forms":"<path d=\"M17 7H22V17H17V19C17 19.2652 17.1054 19.5196 17.2929 19.7071C17.4804 19.8946 17.7348 20 18 20H20V22H17.5C16.95 22 16 21.55 16 21C16 21.55 15.05 22 14.5 22H12V20H14C14.2652 20 14.5196 19.8946 14.7071 19.7071C14.8946 19.5196 15 19.2652 15 19V5C15 4.73478 14.8946 4.48043 14.7071 4.29289C14.5196 4.10536 14.2652 4 14 4H12V2H14.5C15.05 2 16 2.45 16 3C16 2.45 16.95 2 17.5 2H20V4H18C17.7348 4 17.4804 4.10536 17.2929 4.29289C17.1054 4.48043 17 4.73478 17 5V7ZM2 7H13V9H4V15H13V17H2V7ZM20 15V9H17V15H20Z\" fill=\"currentColor\"/>","grocery":"<path d=\"M16 22C14.3333 22 12.9167 21.4167 11.75 20.25C10.5833 19.0833 10 17.6667 10 16C10 14.3333 10.5833 12.9167 11.75 11.75C12.9167 10.5833 14.3333 10 16 10C17.6667 10 19.0833 10.5833 20.25 11.75C21.4167 12.9167 22 14.3333 22 16C22 17.6667 21.4167 19.0833 20.25 20.25C19.0833 21.4167 17.6667 22 16 22ZM16 20C17.1 20 18.0417 19.6083 18.825 18.825C19.6083 18.0417 20 17.1 20 16C20 14.9 19.6083 13.9583 18.825 13.175C18.0417 12.3917 17.1 12 16 12C14.9 12 13.9583 12.3917 13.175 13.175C12.3917 13.9583 12 14.9 12 16C12 17.1 12.3917 18.0417 13.175 18.825C13.9583 19.6083 14.9 20 16 20ZM4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V10.4C2 10.2667 2.0125 10.1333 2.0375 10C2.0625 9.86667 2.1 9.73333 2.15 9.6L4.15 5H4C3.71667 5 3.47917 4.90417 3.2875 4.7125C3.09583 4.52083 3 4.28333 3 4V3C3 2.71667 3.09583 2.47917 3.2875 2.2875C3.47917 2.09583 3.71667 2 4 2H11C11.2833 2 11.5208 2.09583 11.7125 2.2875C11.9042 2.47917 12 2.71667 12 3V4C12 4.28333 11.9042 4.52083 11.7125 4.7125C11.5208 4.90417 11.2833 5 11 5H10.85L12.5 8.8C12.1833 8.96667 11.8833 9.14167 11.6 9.325C11.3167 9.50833 11.05 9.71667 10.8 9.95L8.7 5H6.3L4 10.4V18H8.25C8.33333 18.35 8.44583 18.6958 8.5875 19.0375C8.72917 19.3792 8.9 19.7 9.1 20H4ZM16 9C15.3 9 14.7083 8.75833 14.225 8.275C13.7417 7.79167 13.5 7.2 13.5 6.5C13.5 5.8 13.7417 5.20833 14.225 4.725C14.7083 4.24167 15.3 4 16 4V9C16 8.3 16.2417 7.70833 16.725 7.225C17.2083 6.74167 17.8 6.5 18.5 6.5C19.2 6.5 19.7917 6.74167 20.275 7.225C20.7583 7.70833 21 8.3 21 9H16Z\" fill=\"currentColor\"/>","group-chat":"<path d=\"M4 13C5.1 13 6 12.1 6 11C6 9.9 5.1 9 4 9C2.9 9 2 9.9 2 11C2 12.1 2.9 13 4 13ZM5.13 14.1C4.76 14.04 4.39 14 4 14C3.01 14 2.07 14.21 1.22 14.58C0.48 14.9 0 15.62 0 16.43V18H4.5V16.39C4.5 15.56 4.73 14.78 5.13 14.1ZM20 13C21.1 13 22 12.1 22 11C22 9.9 21.1 9 20 9C18.9 9 18 9.9 18 11C18 12.1 18.9 13 20 13ZM24 16.43C24 15.62 23.52 14.9 22.78 14.58C21.93 14.21 20.99 14 20 14C19.61 14 19.24 14.04 18.87 14.1C19.27 14.78 19.5 15.56 19.5 16.39V18H24V16.43ZM16.24 13.65C15.07 13.13 13.63 12.75 12 12.75C10.37 12.75 8.93 13.14 7.76 13.65C6.68 14.13 6 15.21 6 16.39V18H18V16.39C18 15.21 17.32 14.13 16.24 13.65ZM8.07 16C8.16 15.77 8.2 15.61 8.98 15.31C9.95 14.93 10.97 14.75 12 14.75C13.03 14.75 14.05 14.93 15.02 15.31C15.79 15.61 15.83 15.77 15.93 16H8.07ZM12 8C12.55 8 13 8.45 13 9C13 9.55 12.55 10 12 10C11.45 10 11 9.55 11 9C11 8.45 11.45 8 12 8ZM12 6C10.34 6 9 7.34 9 9C9 10.66 10.34 12 12 12C13.66 12 15 10.66 15 9C15 7.34 13.66 6 12 6Z\" fill=\"currentColor\"/>","group":"<path d=\"M1 20V17.2C1 16.6333 1.146 16.1123 1.438 15.637C1.72933 15.1623 2.11667 14.8 2.6 14.55C3.63333 14.0333 4.68333 13.6457 5.75 13.387C6.81667 13.129 7.9 13 9 13C10.1 13 11.1833 13.129 12.25 13.387C13.3167 13.6457 14.3667 14.0333 15.4 14.55C15.8833 14.8 16.2707 15.1623 16.562 15.637C16.854 16.1123 17 16.6333 17 17.2V20H1ZM19 20V17C19 16.2667 18.796 15.5623 18.388 14.887C17.9793 14.2123 17.4 13.6333 16.65 13.15C17.5 13.25 18.3 13.4207 19.05 13.662C19.8 13.904 20.5 14.2 21.15 14.55C21.75 14.8833 22.2083 15.254 22.525 15.662C22.8417 16.0707 23 16.5167 23 17V20H19ZM9 12C7.9 12 6.95833 11.6083 6.175 10.825C5.39167 10.0417 5 9.1 5 8C5 6.9 5.39167 5.95833 6.175 5.175C6.95833 4.39167 7.9 4 9 4C10.1 4 11.0417 4.39167 11.825 5.175C12.6083 5.95833 13 6.9 13 8C13 9.1 12.6083 10.0417 11.825 10.825C11.0417 11.6083 10.1 12 9 12ZM15 12C14.8167 12 14.5833 11.9793 14.3 11.938C14.0167 11.896 13.7833 11.85 13.6 11.8C14.05 11.2667 14.3957 10.675 14.637 10.025C14.879 9.375 15 8.7 15 8C15 7.3 14.879 6.625 14.637 5.975C14.3957 5.325 14.05 4.73333 13.6 4.2C13.8333 4.11667 14.0667 4.06233 14.3 4.037C14.5333 4.01233 14.7667 4 15 4C16.1 4 17.0417 4.39167 17.825 5.175C18.6083 5.95833 19 6.9 19 8C19 9.1 18.6083 10.0417 17.825 10.825C17.0417 11.6083 16.1 12 15 12ZM3 18H15V17.2C15 17.0167 14.9543 16.85 14.863 16.7C14.771 16.55 14.65 16.4333 14.5 16.35C13.6 15.9 12.6917 15.5623 11.775 15.337C10.8583 15.1123 9.93333 15 9 15C8.06667 15 7.14167 15.1123 6.225 15.337C5.30833 15.5623 4.4 15.9 3.5 16.35C3.35 16.4333 3.22933 16.55 3.138 16.7C3.046 16.85 3 17.0167 3 17.2V18ZM9 10C9.55 10 10.021 9.804 10.413 9.412C10.8043 9.02067 11 8.55 11 8C11 7.45 10.8043 6.97933 10.413 6.588C10.021 6.196 9.55 6 9 6C8.45 6 7.97933 6.196 7.588 6.588C7.196 6.97933 7 7.45 7 8C7 8.55 7.196 9.02067 7.588 9.412C7.97933 9.804 8.45 10 9 10Z\" fill=\"currentColor\"/>","grow":"<path d=\"M18.8597 5.58931C18.2722 4.26006 17.311 3.13016 16.0932 2.337C14.8754 1.54383 13.4534 1.12158 12.0001 1.12158C10.5467 1.12158 9.1247 1.54383 7.90689 2.337C6.68908 3.13016 5.72795 4.26006 5.14037 5.58931C3.49124 6.39985 2.21903 7.8162 1.58945 9.54254C0.959867 11.2689 1.0216 13.1717 1.76176 14.8536C2.50191 16.5355 3.86325 17.8664 5.56145 18.5683C7.25965 19.2703 9.16339 19.289 10.8751 18.6206V21.7499C10.8751 22.0483 10.9936 22.3344 11.2046 22.5454C11.4155 22.7564 11.7017 22.8749 12.0001 22.8749C12.2984 22.8749 12.5846 22.7564 12.7955 22.5454C13.0065 22.3344 13.1251 22.0483 13.1251 21.7499V18.6224C13.9607 18.9534 14.8513 19.1238 15.7501 19.1249H15.9301C17.5273 19.0856 19.065 18.5105 20.2962 17.4921C21.5273 16.4736 22.3804 15.071 22.7184 13.5093C23.0564 11.9477 22.8597 10.3178 22.1599 8.88147C21.4601 7.4451 20.2978 6.28563 18.8597 5.58931ZM15.8766 16.8749C14.9031 16.8989 13.9448 16.6309 13.1251 16.1052V12.6956L17.0035 10.7559C17.1378 10.6911 17.2579 10.6002 17.3567 10.4886C17.4556 10.377 17.5313 10.2468 17.5794 10.1057C17.6275 9.96459 17.6471 9.8153 17.637 9.66654C17.627 9.51777 17.5874 9.37249 17.5207 9.23915C17.4539 9.10581 17.3614 8.98706 17.2483 8.88982C17.1353 8.79257 17.0041 8.71877 16.8622 8.67269C16.7204 8.62662 16.5709 8.6092 16.4223 8.62144C16.2737 8.63368 16.129 8.67534 15.9966 8.74399L13.1251 10.1793V8.24993C13.1251 7.95156 13.0065 7.66542 12.7955 7.45444C12.5846 7.24346 12.2984 7.12493 12.0001 7.12493C11.7017 7.12493 11.4155 7.24346 11.2046 7.45444C10.9936 7.66542 10.8751 7.95156 10.8751 8.24993V12.4293L8.00349 10.994C7.73731 10.8656 7.43128 10.847 7.15154 10.9424C6.87181 11.0378 6.64085 11.2394 6.50858 11.5037C6.37631 11.768 6.35335 12.0738 6.44468 12.3548C6.536 12.6359 6.73426 12.8698 6.99662 13.0059L10.8751 14.9456V16.1052C10.0548 16.6296 9.09679 16.8976 8.12349 16.8749C5.54255 16.8102 3.36849 14.5724 3.37505 11.9877C3.37545 11.0166 3.66694 10.0679 4.2119 9.26408C4.75686 8.46026 5.53025 7.83826 6.43224 7.47837C6.5782 7.41953 6.71018 7.33071 6.81967 7.21767C6.92916 7.10463 7.01371 6.96988 7.06787 6.82212C7.43683 5.8105 8.10794 4.9368 8.99021 4.31946C9.87249 3.70213 10.9232 3.37102 12.0001 3.37102C13.0769 3.37102 14.1276 3.70213 15.0099 4.31946C15.8922 4.9368 16.5633 5.8105 16.9322 6.82212C16.9864 6.96988 17.071 7.10463 17.1804 7.21767C17.2899 7.33071 17.4219 7.41953 17.5679 7.47837C18.4696 7.83814 19.2428 8.45986 19.7877 9.2633C20.3326 10.0667 20.6243 11.0151 20.6251 11.9859C20.6326 14.5696 18.4576 16.8084 15.8766 16.8749Z\" fill=\"currentColor\"/>","help":"<path d=\"M11 18H13V16H11V18ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z\" fill=\"currentColor\"/>","hide":"<path d=\"M2 5.27L3.28 4L20 20.72L18.73 22L15.65 18.92C14.5 19.3 13.28 19.5 12 19.5C7 19.5 2.73 16.39 1 12C1.69 10.24 2.79 8.69 4.19 7.46L2 5.27ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15.0005 12.3406 14.943 12.6787 14.83 13L11 9.17C11.3213 9.05698 11.6594 8.99949 12 9ZM12 4.5C17 4.5 21.27 7.61 23 12C22.1834 14.0729 20.7966 15.8723 19 17.19L17.58 15.76C18.9629 14.8034 20.0783 13.5091 20.82 12C20.0117 10.3499 18.7565 8.95963 17.1974 7.98735C15.6382 7.01508 13.8375 6.49976 12 6.5C10.91 6.5 9.84 6.68 8.84 7L7.3 5.47C8.74 4.85 10.33 4.5 12 4.5ZM3.18 12C3.98835 13.6501 5.24345 15.0404 6.80264 16.0126C8.36182 16.9849 10.1625 17.5002 12 17.5C12.69 17.5 13.37 17.43 14 17.29L11.72 15C11.0242 14.9254 10.3748 14.6149 9.87997 14.12C9.38512 13.6252 9.07458 12.9758 9 12.28L5.6 8.87C4.61 9.72 3.78 10.78 3.18 12Z\" fill=\"currentColor\"/>","history":"<path d=\"M13 3C8.03 3 4 7.03 4 12H1L4.89 15.89L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 19.99 10.51 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.25 15.52L17.02 14.24L13.5 12.15V8H12Z\" fill=\"currentColor\"/>","home":"<path d=\"M3.99844 21V9L11.9984 3L19.9984 9V21H13.9984V14H9.99844V21H3.99844ZM5.99844 19H7.99844V12H15.9984V19H17.9984V10L11.9984 5.5L5.99844 10V19Z\" fill=\"currentColor\"/>","horizontal-rule":"<path d=\"M20 11H4V13H20V11Z\" fill=\"currentColor\"/>","hub":"<path d=\"M19.5 8.36957C18.1167 8.36957 17 9.47652 17 10.8478C17 10.9057 17 10.9635 17.0083 11.0213L15.3167 11.583C14.7833 10.5835 13.8 9.85652 12.6333 9.66652V7.88217C13.7 7.6013 14.5 6.63478 14.5 5.47826C14.5 4.10696 13.3833 3 12 3C10.6167 3 9.5 4.10696 9.5 5.47826C9.5 6.63478 10.3 7.6013 11.375 7.88217V9.66652C10.2083 9.85652 9.225 10.5835 8.69167 11.583L6.99167 11.0213C7 10.9635 7 10.9057 7 10.8478C7 9.47652 5.88333 8.36957 4.5 8.36957C3.11667 8.36957 2 9.47652 2 10.8478C2 12.2191 3.11667 13.3261 4.5 13.3261C5.38333 13.3261 6.15 12.8717 6.6 12.1943L8.29167 12.7561C8.125 13.8217 8.43333 14.9535 9.2 15.8043L8.025 17.2665C7.70833 17.1178 7.36667 17.0435 7 17.0435C5.61667 17.0435 4.5 18.1504 4.5 19.5217C4.5 20.893 5.61667 22 7 22C8.38333 22 9.5 20.893 9.5 19.5217C9.5 18.96 9.31667 18.4478 9 18.0348L10.175 16.5726C11.3083 17.2004 12.6917 17.1922 13.8167 16.5726L14.9917 18.0348C14.6833 18.4478 14.5 18.96 14.5 19.5217C14.5 20.893 15.6167 22 17 22C18.3833 22 19.5 20.893 19.5 19.5217C19.5 18.1504 18.3833 17.0435 17 17.0435C16.6333 17.0435 16.2917 17.1178 15.975 17.2583L14.8 15.7961C15.575 14.937 15.875 13.8135 15.7083 12.7478L17.4 12.1861C17.8417 12.8635 18.6167 13.3178 19.5 13.3178C20.8833 13.3178 22 12.2109 22 10.8396C22 9.46826 20.8833 8.36957 19.5 8.36957ZM4.5 11.6739C4.04167 11.6739 3.66667 11.3022 3.66667 10.8478C3.66667 10.3935 4.04167 10.0217 4.5 10.0217C4.95833 10.0217 5.33333 10.3935 5.33333 10.8478C5.33333 11.3022 4.95833 11.6739 4.5 11.6739ZM7 20.3478C6.54167 20.3478 6.16667 19.9761 6.16667 19.5217C6.16667 19.0674 6.54167 18.6957 7 18.6957C7.45833 18.6957 7.83333 19.0674 7.83333 19.5217C7.83333 19.9761 7.45833 20.3478 7 20.3478ZM11.1667 5.47826C11.1667 5.02391 11.5417 4.65217 12 4.65217C12.4583 4.65217 12.8333 5.02391 12.8333 5.47826C12.8333 5.93261 12.4583 6.30435 12 6.30435C11.5417 6.30435 11.1667 5.93261 11.1667 5.47826ZM12 15.3913C10.85 15.3913 9.91667 14.4661 9.91667 13.3261C9.91667 12.1861 10.85 11.2609 12 11.2609C13.15 11.2609 14.0833 12.1861 14.0833 13.3261C14.0833 14.4661 13.15 15.3913 12 15.3913ZM17 18.6957C17.4583 18.6957 17.8333 19.0674 17.8333 19.5217C17.8333 19.9761 17.4583 20.3478 17 20.3478C16.5417 20.3478 16.1667 19.9761 16.1667 19.5217C16.1667 19.0674 16.5417 18.6957 17 18.6957ZM19.5 11.6739C19.0417 11.6739 18.6667 11.3022 18.6667 10.8478C18.6667 10.3935 19.0417 10.0217 19.5 10.0217C19.9583 10.0217 20.3333 10.3935 20.3333 10.8478C20.3333 11.3022 19.9583 11.6739 19.5 11.6739Z\" fill=\"currentColor\"/>","image":"<path d=\"M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14.14 11.86L11.14 15.73L9 13.14L6 17H18L14.14 11.86Z\" fill=\"currentColor\"/>","information":"<path d=\"M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z\" fill=\"currentColor\"/>","insurance":"<path d=\"M7 16V17C7 17.2833 7.096 17.521 7.288 17.713C7.48 17.905 7.71733 18.0007 8 18C8.28333 18 8.521 17.904 8.713 17.712C8.905 17.52 9.00067 17.2827 9 17V16H10C10.2833 16 10.521 15.904 10.713 15.712C10.905 15.52 11.0007 15.2827 11 15C11 14.7167 10.904 14.4793 10.712 14.288C10.52 14.0967 10.2827 14.0007 10 14H9V13C9 12.7167 8.904 12.4793 8.712 12.288C8.52 12.0967 8.28267 12.0007 8 12C7.71667 12 7.47933 12.096 7.288 12.288C7.09667 12.48 7.00067 12.7173 7 13V14H6C5.71667 14 5.47933 14.096 5.288 14.288C5.09667 14.48 5.00067 14.7173 5 15C5 15.2833 5.096 15.521 5.288 15.713C5.48 15.905 5.71733 16.0007 6 16H7ZM13.75 14.5H18.25C18.4667 14.5 18.646 14.429 18.788 14.287C18.93 14.145 19.0007 13.966 19 13.75C19 13.5333 18.929 13.3543 18.787 13.213C18.645 13.0717 18.466 13.0007 18.25 13H13.75C13.5333 13 13.3543 13.071 13.213 13.213C13.0717 13.355 13.0007 13.534 13 13.75C13 13.9667 13.071 14.146 13.213 14.288C13.355 14.43 13.534 14.5007 13.75 14.5ZM13.75 17.5H16.25C16.4667 17.5 16.646 17.429 16.788 17.287C16.93 17.145 17.0007 16.966 17 16.75C17 16.5333 16.929 16.3543 16.787 16.213C16.645 16.0717 16.466 16.0007 16.25 16H13.75C13.5333 16 13.3543 16.071 13.213 16.213C13.0717 16.355 13.0007 16.534 13 16.75C13 16.9667 13.071 17.146 13.213 17.288C13.355 17.43 13.534 17.5007 13.75 17.5ZM4 22C3.45 22 2.97933 21.8043 2.588 21.413C2.19667 21.0217 2.00067 20.5507 2 20V9C2 8.45 2.196 7.97933 2.588 7.588C2.98 7.19667 3.45067 7.00067 4 7H9V4C9 3.45 9.196 2.97933 9.588 2.588C9.98 2.19667 10.4507 2.00067 11 2H13C13.55 2 14.021 2.196 14.413 2.588C14.805 2.98 15.0007 3.45067 15 4V7H20C20.55 7 21.021 7.196 21.413 7.588C21.805 7.98 22.0007 8.45067 22 9V20C22 20.55 21.8043 21.021 21.413 21.413C21.0217 21.805 20.5507 22.0007 20 22H4ZM4 20H20V9H15C15 9.55 14.8043 10.021 14.413 10.413C14.0217 10.805 13.5507 11.0007 13 11H11C10.45 11 9.97933 10.8043 9.588 10.413C9.19667 10.0217 9.00067 9.55067 9 9H4V20ZM11 9H13V4H11V9Z\" fill=\"currentColor\"/>","internal-note":"<path d=\"M19 3H18V1H16V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V9H19V19ZM5 7V5H19V7H5ZM7 11H17V13H7V11ZM7 15H14V17H7V15Z\" fill=\"currentColor\"/>","invoice":"<path d=\"M17 7V9H15V7H17ZM13 7V9H7V7H13ZM13 11H7V13H13V11ZM15 11V13H17V11H15ZM21 22L18 20L15 22L12 20L9 22L6 20L3 22V3H21V22ZM19 18.26V5H5V18.26L6 17.6L9 19.6L12 17.6L15 19.6L18 17.6L19 18.26Z\" fill=\"currentColor\"/>","journals":"<path d=\"M17 4V10L15 8L13 10V4H9V20H19V4H17ZM3 7V5H5V4C5 3.46957 5.21071 2.96086 5.58579 2.58579C5.96086 2.21071 6.46957 2 7 2H19C20.05 2 21 2.95 21 4V20C21 21.05 20.05 22 19 22H7C5.95 22 5 21.05 5 20V19H3V17H5V13H3V11H5V7H3ZM5 5V7H7V5H5ZM5 19H7V17H5V19ZM5 13H7V11H5V13Z\" fill=\"currentColor\"/>","keyboard-arrow-down":"<path d=\"M7.41 8.58997L12 13.17L16.59 8.58997L18 9.99997L12 16L6 9.99997L7.41 8.58997Z\" fill=\"currentColor\"/>","keyboard-arrow-left":"<path d=\"M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z\" fill=\"currentColor\"/>","keyboard-arrow-right":"<path d=\"M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z\" fill=\"currentColor\"/>","keyboard-arrow-up":"<path d=\"M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z\" fill=\"currentColor\"/>","labs":"<path d=\"M12 22C10.6167 22 9.43767 21.5123 8.463 20.537C7.48833 19.5617 7.00067 18.3827 7 17V8C6.45 8 5.97933 7.80433 5.588 7.413C5.19667 7.02167 5.00067 6.55067 5 6V4C5 3.45 5.196 2.97933 5.588 2.588C5.98 2.19667 6.45067 2.00067 7 2H17C17.55 2 18.021 2.196 18.413 2.588C18.805 2.98 19.0007 3.45067 19 4V6C19 6.55 18.8043 7.021 18.413 7.413C18.0217 7.805 17.5507 8.00067 17 8V17C17 18.3833 16.5123 19.5627 15.537 20.538C14.5617 21.5133 13.3827 22.0007 12 22ZM7 6H17V4H7V6ZM12 20C12.8333 20 13.5417 19.7083 14.125 19.125C14.7083 18.5417 15 17.8333 15 17H12V15H15V13H12V11H15V8H9V17C9 17.8333 9.29167 18.5417 9.875 19.125C10.4583 19.7083 11.1667 20 12 20Z\" fill=\"currentColor\"/>","large-arrow-dropdown-up":"<path d=\"M19.5 15L12 7.5L4.5 15L19.5 15Z\" fill=\"currentColor\"/>","large-arrow-dropdown":"<path d=\"M4.5 9L12 16.5L19.5 9H4.5Z\" fill=\"currentColor\"/>","launch":"<path d=\"M12.1465 9.47847C12.4345 9.00724 13.0503 8.85851 13.5215 9.14644C13.9928 9.43441 14.1415 10.0502 13.8536 10.5214C13.441 11.1965 13.3361 11.8963 13.375 12.6796C13.3949 13.0792 13.4515 13.4895 13.5215 13.9296C13.5888 14.3528 13.6745 14.8328 13.7305 15.291C13.8436 16.2155 13.8741 17.2836 13.3829 18.3183C13.27 18.5559 13.1331 18.7825 12.9727 19H17C17.5523 19 18 19.4477 18 20C18 20.5522 17.5523 21 17 21H7.00004C6.44776 21 6.00004 20.5522 6.00004 20C6.00004 19.4477 6.44776 19 7.00004 19H9.7686C10.8757 18.4647 11.3541 17.9278 11.5762 17.4599C11.8193 16.9478 11.8445 16.3469 11.7452 15.5341C11.695 15.1236 11.6222 14.7174 11.5469 14.2441C11.4743 13.7878 11.4034 13.2906 11.378 12.7793C11.3263 11.7409 11.4592 10.6033 12.1465 9.47847Z\" fill=\"currentColor\"/> <path d=\"M3.82426 7.61519C6.82439 7.07946 8.71795 7.59459 10.0879 8.59078C11.2816 9.45889 12.0299 10.836 12.543 12.2011L12.7491 12.7841L12.7774 12.8867C12.8303 13.1293 12.7909 13.3845 12.6651 13.6015C12.5211 13.8496 12.2774 14.0248 11.9961 14.081C9.93837 14.4926 8.15873 14.5471 6.55278 13.6933C6.54848 13.6912 6.54437 13.6896 6.54008 13.6875C6.53559 13.6851 6.53089 13.683 6.52641 13.6806C5.02022 12.9163 3.79099 11.349 3.04301 8.89156C2.95978 8.6181 2.99827 8.32187 3.1475 8.07808C3.29675 7.83428 3.54286 7.66544 3.82426 7.61519ZM8.91215 10.2089C8.22005 9.70559 7.19645 9.28639 5.36821 9.42964C5.92906 10.707 6.6201 11.433 7.28129 11.8164L7.44731 11.9052L7.47367 11.9199C8.24295 12.3341 9.14878 12.4565 10.4248 12.3085C10.0139 11.3818 9.52183 10.6525 8.91215 10.2089ZM18.9629 3.00093C19.2418 2.9906 19.5123 3.09703 19.709 3.29488C19.9057 3.49282 20.0111 3.76416 19.9991 4.04292C19.891 6.52843 19.2246 8.08887 18.0069 9.3066C17.9808 9.33266 17.9536 9.35778 17.9248 9.38081L17.6934 9.5566C16.5142 10.4118 14.9711 10.898 13.0528 10.999C12.7844 11.0131 12.5212 10.918 12.3233 10.7363C12.1256 10.5545 12.0097 10.3006 12.001 10.0322C11.9486 8.41643 12.3866 6.82261 13.2579 5.46089L13.3565 5.33101C13.8725 4.75766 14.5267 4.18925 15.4512 3.75679C16.3705 3.32682 17.507 3.05487 18.9629 3.00093ZM17.8926 5.1064C17.232 5.20967 16.7147 5.37381 16.2989 5.56831C15.7032 5.84694 15.2701 6.2062 14.8985 6.60835C14.4664 7.30438 14.1841 8.07854 14.0635 8.88179C15.1923 8.69475 16.0208 8.32688 16.6289 7.85445C17.2356 7.23507 17.6877 6.4506 17.8926 5.1064Z\" fill=\"currentColor\"/>","learning":"<path d=\"M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z\" fill=\"currentColor\"/>","lifestyle-recommendations":"<path d=\"M17.825 6.175L20.65 3.35C20.85 3.15 21.0877 3.05 21.363 3.05C21.6383 3.05 21.8757 3.15 22.075 3.35C22.2743 3.55 22.3743 3.78767 22.375 4.063C22.3757 4.33833 22.2757 4.57567 22.075 4.775L18.525 8.3C18.325 8.5 18.0917 8.6 17.825 8.6C17.5583 8.6 17.325 8.5 17.125 8.3L15.7 6.875C15.5167 6.69167 15.425 6.46267 15.425 6.188C15.425 5.91333 15.5167 5.67567 15.7 5.475C15.9 5.275 16.1377 5.175 16.413 5.175C16.6883 5.175 16.9257 5.275 17.125 5.475L17.825 6.175ZM12 18L7.8 19.8C7.13333 20.0833 6.5 20.0293 5.9 19.638C5.3 19.2467 5 18.6923 5 17.975V5C5 4.45 5.196 3.97933 5.588 3.588C5.98 3.19667 6.45067 3.00067 7 3H12C12.2833 3 12.521 3.096 12.713 3.288C12.905 3.48 13.0007 3.71733 13 4C12.9993 4.28267 12.9033 4.52033 12.712 4.713C12.5207 4.90567 12.2833 5.00133 12 5H7V17.95L12 15.8L17 17.95V12C17 11.7167 17.096 11.4793 17.288 11.288C17.48 11.0967 17.7173 11.0007 18 11C18.2827 10.9993 18.5203 11.0953 18.713 11.288C18.9057 11.4807 19.0013 11.718 19 12V17.975C19 18.6917 18.7 19.246 18.1 19.638C17.5 20.03 16.8667 20.084 16.2 19.8L12 18ZM12 5H7H13H12Z\" fill=\"currentColor\"/>","link":"<path d=\"M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7Z\" fill=\"currentColor\"/>","lock":"<path d=\"M6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V10C4 9.45 4.19583 8.97917 4.5875 8.5875C4.97917 8.19583 5.45 8 6 8H7V6C7 4.61667 7.4875 3.4375 8.4625 2.4625C9.4375 1.4875 10.6167 1 12 1C13.3833 1 14.5625 1.4875 15.5375 2.4625C16.5125 3.4375 17 4.61667 17 6V8H18C18.55 8 19.0208 8.19583 19.4125 8.5875C19.8042 8.97917 20 9.45 20 10V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM6 20H18V10H6V20ZM12 17C12.55 17 13.0208 16.8042 13.4125 16.4125C13.8042 16.0208 14 15.55 14 15C14 14.45 13.8042 13.9792 13.4125 13.5875C13.0208 13.1958 12.55 13 12 13C11.45 13 10.9792 13.1958 10.5875 13.5875C10.1958 13.9792 10 14.45 10 15C10 15.55 10.1958 16.0208 10.5875 16.4125C10.9792 16.8042 11.45 17 12 17ZM9 8H15V6C15 5.16667 14.7083 4.45833 14.125 3.875C13.5417 3.29167 12.8333 3 12 3C11.1667 3 10.4583 3.29167 9.875 3.875C9.29167 4.45833 9 5.16667 9 6V8Z\" fill=\"currentColor\"/>","lunch":"<path d=\"M2 19V17H22V19H2ZM3 16V15C3 12.8667 3.65417 10.9833 4.9625 9.35C6.27083 7.71667 7.95 6.68333 10 6.25V6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6V6.25C16.0667 6.68333 17.75 7.71667 19.05 9.35C20.35 10.9833 21 12.8667 21 15V16H3ZM5.05 14H18.95C18.7167 12.2667 17.9417 10.8333 16.625 9.7C15.3083 8.56667 13.7667 8 12 8C10.2333 8 8.69583 8.56667 7.3875 9.7C6.07917 10.8333 5.3 12.2667 5.05 14Z\" fill=\"currentColor\"/>","magic-wand":"<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M19.7438 21.5121L21.5115 19.7434C21.6664 19.5885 21.7892 19.4045 21.873 19.2021C21.9569 18.9997 22 18.7827 22 18.5636C22 18.3444 21.9569 18.1275 21.873 17.925C21.7892 17.7224 21.6662 17.5389 21.5115 17.3841L9.61239 5.4756L9.60737 5.4708C9.29115 5.16862 8.87073 5.00001 8.4335 5.00001C7.99628 5.00001 7.57581 5.16856 7.25958 5.47074L5.48738 7.24432C5.17528 7.5574 5 7.98158 5 8.42382C5 8.86607 5.17552 9.29049 5.48762 9.60357L17.3865 21.5124C17.6993 21.8246 18.1232 22 18.565 22C19.0069 22 19.431 21.8244 19.7438 21.5121ZM10.0826 11.4182L7.09111 8.42437L8.43347 7.08097L11.4248 10.0747L10.0826 11.4182ZM18.5651 19.9068L19.9075 18.5639L12.8163 11.4672L11.4738 12.8107L18.5651 19.9068Z\" fill=\"currentColor\"/> <path d=\"M3.42966 10.5781L2 12.0077L3.42966 13.4374L4.85933 12.0077L3.42966 10.5781Z\" fill=\"currentColor\"/> <path d=\"M12.0077 2L10.5781 3.42966L12.0077 4.85933L13.4374 3.42966L12.0077 2Z\" fill=\"currentColor\"/> <path d=\"M3.42966 2L2 3.42966L3.42966 4.85933L4.85933 3.42966L3.42966 2Z\" fill=\"currentColor\"/>","measurements-vitals":"<path d=\"M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3ZM12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289C12.8946 3.48043 13 3.73478 13 4C13 4.26522 12.8946 4.51957 12.7071 4.70711C12.5196 4.89464 12.2652 5 12 5C11.7348 5 11.4804 4.89464 11.2929 4.70711C11.1054 4.51957 11 4.26522 11 4C11 3.73478 11.1054 3.48043 11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3ZM5 15H8.11L9.62 12.15L10.38 17.92L14.07 13.21L15.89 15H19V19H5V15ZM19 13.46H16.53L13.93 10.86L11.44 14.05L10.5 7.08L7.17 13.46H5V5H7V6H17V5H19V13.46Z\" fill=\"currentColor\"/>","medical":"<path d=\"M20 6H16V4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2 6.9 2 8V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V8C22 6.9 21.1 6 20 6ZM10 4H14V6H10V4ZM20 20H4V8H20V20Z\" fill=\"currentColor\"/> <path d=\"M13 10H11V13H8V15H11V18H13V15H16V13H13V10Z\" fill=\"currentColor\"/>","menstrual-health":"<path d=\"M12 1.875C12.8167 2.85833 13.55 3.77083 14.2 4.6125C14.85 5.45417 15.4333 6.25833 15.95 7.025L22 2.5V12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12V2.5L8.05 7.025C8.56667 6.275 9.15 5.475 9.8 4.625C10.45 3.775 11.1833 2.85833 12 1.875ZM4 6.5V12C4 12.7333 4.09583 13.4375 4.2875 14.1125C4.47917 14.7875 4.74167 15.4167 5.075 16C5.04167 15.8333 5.02083 15.6708 5.0125 15.5125C5.00417 15.3542 5 15.1833 5 15C5 14.05 5.15417 13.0708 5.4625 12.0625C5.77083 11.0542 6.275 9.95 6.975 8.75L4 6.5ZM12 5C10.1667 7.23333 8.875 9.18333 8.125 10.85C7.375 12.5167 7 13.9 7 15C7 16.3833 7.4875 17.5625 8.4625 18.5375C9.4375 19.5125 10.6167 20 12 20C13.3833 20 14.5625 19.5125 15.5375 18.5375C16.5125 17.5625 17 16.3833 17 15C17 13.9 16.625 12.5083 15.875 10.825C15.125 9.14167 13.8333 7.2 12 5ZM20 6.5L17.025 8.725C17.725 9.925 18.2292 11.0292 18.5375 12.0375C18.8458 13.0458 19 14.0333 19 15C19 15.1833 18.9958 15.3542 18.9875 15.5125C18.9792 15.6708 18.9583 15.8333 18.925 16C19.2583 15.4167 19.5208 14.7875 19.7125 14.1125C19.9042 13.4375 20 12.7333 20 12V6.5Z\" fill=\"currentColor\"/>","menu":"<path d=\"M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z\" fill=\"currentColor\"/>","merge":"<path d=\"M17.0001 20.41L18.4101 19L15.0001 15.59L13.5901 17L17.0001 20.41ZM7.50009 8H11.0001V13.59L5.59009 19L7.00009 20.41L13.0001 14.41V8H16.5001L12.0001 3.5L7.50009 8Z\" fill=\"currentColor\"/>","message":"<path d=\"M20 2C20.5304 2 21.0391 2.21071 21.4142 2.58579C21.7893 2.96086 22 3.46957 22 4V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H6L2 22V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H20ZM4 4V17.17L5.17 16H20V4H4ZM6 7H18V9H6V7ZM6 11H15V13H6V11Z\" fill=\"currentColor\"/>","microphone":"<path d=\"M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14ZM11 5C11 4.45 11.45 4 12 4C12.55 4 13 4.45 13 5V11C13 11.55 12.55 12 12 12C11.45 12 11 11.55 11 11V5ZM17 11C17 13.76 14.76 16 12 16C9.24 16 7 13.76 7 11H5C5 14.53 7.61 17.43 11 17.92V21H13V17.92C16.39 17.43 19 14.53 19 11H17Z\" fill=\"currentColor\"/>","module":"<path d=\"M15.675 11H19V7H15.675V11ZM10.325 11H13.65V7H10.325V11ZM5 11H8.325V7H5V11ZM5 17H8.325V13H5V17ZM10.325 17H13.65V13H10.325V17ZM15.675 17H19V13H15.675V17ZM3 17V7C3 6.45 3.196 5.97933 3.588 5.588C3.98 5.19667 4.45067 5.00067 5 5H19C19.55 5 20.021 5.196 20.413 5.588C20.805 5.98 21.0007 6.45067 21 7V17C21 17.55 20.8043 18.021 20.413 18.413C20.0217 18.805 19.5507 19.0007 19 19H5C4.45 19 3.97933 18.8043 3.588 18.413C3.19667 18.0217 3.00067 17.5507 3 17Z\" fill=\"currentColor\"/>","money-more":"<path d=\"M5 6H23V18H5V6ZM14 9C14.7956 9 15.5587 9.31607 16.1213 9.87868C16.6839 10.4413 17 11.2044 17 12C17 12.7956 16.6839 13.5587 16.1213 14.1213C15.5587 14.6839 14.7956 15 14 15C13.2044 15 12.4413 14.6839 11.8787 14.1213C11.3161 13.5587 11 12.7956 11 12C11 11.2044 11.3161 10.4413 11.8787 9.87868C12.4413 9.31607 13.2044 9 14 9ZM9 8C9 8.53043 8.78929 9.03914 8.41421 9.41421C8.03914 9.78929 7.53043 10 7 10V14C7.53043 14 8.03914 14.2107 8.41421 14.5858C8.78929 14.9609 9 15.4696 9 16H19C19 15.4696 19.2107 14.9609 19.5858 14.5858C19.9609 14.2107 20.4696 14 21 14V10C20.4696 10 19.9609 9.78929 19.5858 9.41421C19.2107 9.03914 19 8.53043 19 8H9ZM1 10H3V20H19V22H1V10Z\" fill=\"currentColor\"/>","money":"<path d=\"M3 6H21V18H3V6ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9ZM7 8C7 8.53043 6.78929 9.03914 6.41421 9.41421C6.03914 9.78929 5.53043 10 5 10V14C5.53043 14 6.03914 14.2107 6.41421 14.5858C6.78929 14.9609 7 15.4696 7 16H17C17 15.4696 17.2107 14.9609 17.5858 14.5858C17.9609 14.2107 18.4696 14 19 14V10C18.4696 10 17.9609 9.78929 17.5858 9.41421C17.2107 9.03914 17 8.53043 17 8H7Z\" fill=\"currentColor\"/>","more-horizontal":"<path d=\"M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z\" fill=\"currentColor\"/>","more-vertical":"<path d=\"M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z\" fill=\"currentColor\"/>","my-recipes":"<path d=\"M6 22V12.85C5.1 12.6167 4.375 12.1417 3.825 11.425C3.275 10.7083 3 9.9 3 9V2H5V8H6V2H8V8H9V2H11V9C11 9.9 10.725 10.7083 10.175 11.425C9.625 12.1417 8.9 12.6167 8 12.85V22H6ZM16 22V12.475C15.1 12.175 14.375 11.5458 13.825 10.5875C13.275 9.62917 13 8.54167 13 7.325C13 5.84167 13.3917 4.58333 14.175 3.55C14.9583 2.51667 15.9 2 17 2C18.1 2 19.0417 2.52083 19.825 3.5625C20.6083 4.60417 21 5.86667 21 7.35C21 8.56667 20.725 9.65 20.175 10.6C19.625 11.55 18.9 12.175 18 12.475V22H16Z\" fill=\"currentColor\"/>","nest":"<path d=\"M4 7L4 11L17.17 11L13.59 7.41L15 6L21 12L15 18L13.59 16.59L17.17 13L2 13L2 7L4 7Z\" fill=\"currentColor\"/>","notes":"<path d=\"M16 14H8C7.73478 14 7.48043 14.1054 7.29289 14.2929C7.10536 14.4804 7 14.7348 7 15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16H16C16.2652 16 16.5196 15.8946 16.7071 15.7071C16.8946 15.5196 17 15.2652 17 15C17 14.7348 16.8946 14.4804 16.7071 14.2929C16.5196 14.1054 16.2652 14 16 14ZM16 10H10C9.73478 10 9.48043 10.1054 9.29289 10.2929C9.10536 10.4804 9 10.7348 9 11C9 11.2652 9.10536 11.5196 9.29289 11.7071C9.48043 11.8946 9.73478 12 10 12H16C16.2652 12 16.5196 11.8946 16.7071 11.7071C16.8946 11.5196 17 11.2652 17 11C17 10.7348 16.8946 10.4804 16.7071 10.2929C16.5196 10.1054 16.2652 10 16 10ZM20 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H13V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2C11.7348 2 11.4804 2.10536 11.2929 2.29289C11.1054 2.48043 11 2.73478 11 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H4C3.73478 4 3.48043 4.10536 3.29289 4.29289C3.10536 4.48043 3 4.73478 3 5V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H18C18.7956 22 19.5587 21.6839 20.1213 21.1213C20.6839 20.5587 21 19.7956 21 19V5C21 4.73478 20.8946 4.48043 20.7071 4.29289C20.5196 4.10536 20.2652 4 20 4ZM19 19C19 19.2652 18.8946 19.5196 18.7071 19.7071C18.5196 19.8946 18.2652 20 18 20H6C5.73478 20 5.48043 19.8946 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H11V7C11 7.26522 11.1054 7.51957 11.2929 7.70711C11.4804 7.89464 11.7348 8 12 8C12.2652 8 12.5196 7.89464 12.7071 7.70711C12.8946 7.51957 13 7.26522 13 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H19V19Z\" fill=\"currentColor\"/>","notifications":"<path d=\"M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z\" fill=\"currentColor\"/>","nutrients":"<path d=\"M20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V3C3 2.73478 3.10536 2.48043 3.29289 2.29289C3.48043 2.10536 3.73478 2 4 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22ZM19 20V4H5V20H19ZM8 9H16V11H8V9ZM8 13H16V15H8V13Z\" fill=\"currentColor\"/>","office":"<path d=\"M3 21V7H7V3H17V11H21V21H13V17H11V21H3ZM5 19H7V17H5V19ZM5 15H7V13H5V15ZM5 11H7V9H5V11ZM9 15H11V13H9V15ZM9 11H11V9H9V11ZM9 7H11V5H9V7ZM13 15H15V13H13V15ZM13 11H15V9H13V11ZM13 7H15V5H13V7ZM17 19H19V17H17V19ZM17 15H19V13H17V15Z\" fill=\"currentColor\"/>","open-fullscreen":"<path d=\"M21 11V3H13L16.29 6.29L6.29 16.29L3 13V21H11L7.71 17.71L17.71 7.71L21 11Z\" fill=\"currentColor\"/>","payment-recurring":"<path d=\"M3 6V18H13.32C13.1075 17.3546 12.9995 16.6795 13 16H7C7 15.4696 6.78929 14.9609 6.41421 14.5858C6.03914 14.2107 5.53043 14 5 14V10C6.11 10 7 9.11 7 8H17C17 8.53043 17.2107 9.03914 17.5858 9.41421C17.9609 9.78929 18.4696 10 19 10V10.06C19.67 10.06 20.34 10.18 21 10.4V6H3ZM12 9C10.3 9.03 9 10.3 9 12C9 13.7 10.3 14.94 12 15C12.38 15 12.77 14.92 13.14 14.77C13.41 13.67 13.86 12.63 14.97 11.61C14.85 10.28 13.59 8.97 12 9ZM19 11L21.25 13.25L19 15.5V14C17.15 14 15.94 15.96 16.76 17.62L15.67 18.71C13.91 16.05 15.81 12.5 19 12.5V11ZM19 22L16.75 19.75L19 17.5V19C20.85 19 22.06 17.04 21.24 15.38L22.33 14.29C24.09 16.95 22.19 20.5 19 20.5V22Z\" fill=\"currentColor\"/>","payments":"<path d=\"M19 14V6C19 4.9 18.1 4 17 4H3C1.9 4 1 4.9 1 6V14C1 15.1 1.9 16 3 16H17C18.1 16 19 15.1 19 14ZM17 14H3V6H17V14ZM10 7C8.34 7 7 8.34 7 10C7 11.66 8.34 13 10 13C11.66 13 13 11.66 13 10C13 8.34 11.66 7 10 7ZM23 7V18C23 19.1 22.1 20 21 20H4V18H21V7H23Z\" fill=\"currentColor\"/>","person-add":"<path d=\"M13 8C13 5.79 11.21 4 9 4C6.79 4 5 5.79 5 8C5 10.21 6.79 12 9 12C11.21 12 13 10.21 13 8ZM11 8C11 9.1 10.1 10 9 10C7.9 10 7 9.1 7 8C7 6.9 7.9 6 9 6C10.1 6 11 6.9 11 8ZM1 18V20H17V18C17 15.34 11.67 14 9 14C6.33 14 1 15.34 1 18ZM3 18C3.2 17.29 6.3 16 9 16C11.69 16 14.78 17.28 15 18H3ZM20 15V12H23V10H20V7H18V10H15V12H18V15H20Z\" fill=\"currentColor\"/>","person-remove":"<path d=\"M14 8C14 5.79 12.21 4 10 4C7.79 4 6 5.79 6 8C6 10.21 7.79 12 10 12C12.21 12 14 10.21 14 8ZM12 8C12 9.1 11.1 10 10 10C8.9 10 8 9.1 8 8C8 6.9 8.9 6 10 6C11.1 6 12 6.9 12 8Z\" fill=\"currentColor\"/> <path d=\"M2 18V20H18V18C18 15.34 12.67 14 10 14C7.33 14 2 15.34 2 18ZM4 18C4.2 17.29 7.3 16 10 16C12.69 16 15.77 17.28 16 18H4Z\" fill=\"currentColor\"/> <path d=\"M23 10H17V12H23V10Z\" fill=\"currentColor\"/>","person-search":"<path d=\"M10 12C12.21 12 14 10.21 14 8C14 5.79 12.21 4 10 4C7.79 4 6 5.79 6 8C6 10.21 7.79 12 10 12ZM10 6C11.1 6 12 6.9 12 8C12 9.1 11.1 10 10 10C8.9 10 8 9.1 8 8C8 6.9 8.9 6 10 6Z\" fill=\"currentColor\"/> <path d=\"M4 18C4.22 17.28 7.31 16 10 16C10 15.3 10.13 14.63 10.35 14.01C7.62 13.91 2 15.27 2 18V20H11.54C11.02 19.42 10.61 18.75 10.35 18H4Z\" fill=\"currentColor\"/> <path d=\"M19.43 18.02C19.79 17.43 20 16.74 20 16C20 13.79 18.21 12 16 12C13.79 12 12 13.79 12 16C12 18.21 13.79 20 16 20C16.74 20 17.43 19.78 18.02 19.43C18.95 20.36 19.64 21.05 20.59 22L22 20.59C20.5 19.09 21.21 19.79 19.43 18.02ZM16 18C14.9 18 14 17.1 14 16C14 14.9 14.9 14 16 14C17.1 14 18 14.9 18 16C18 17.1 17.1 18 16 18Z\" fill=\"currentColor\"/>","person":"<path d=\"M12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6ZM12 16C14.7 16 17.8 17.29 18 18H6C6.23 17.28 9.31 16 12 16ZM12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z\" fill=\"currentColor\"/>","pie-chart":"<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.99983 2.20006L9.99992 4.25206C6.54945 5.14016 4.00002 8.27234 4.00002 12C4.00002 16.4182 7.58173 20 12 20C15.7277 20 18.8598 17.4504 19.748 14H21.8C20.8734 18.5645 16.8379 22 12 22C6.47717 22 2 17.5228 2 12C2 7.16211 5.43547 3.12664 9.99988 2.20006M12 2C17.4676 2 21.9103 6.38806 21.9987 11.8346L22 12H12V2Z\" fill=\"currentColor\"/>","pin":"<path d=\"M14 4V9C14 10.12 14.37 11.16 15 12H9C9.65 11.14 10 10.1 10 9V4H14ZM17 2H7C6.45 2 6 2.45 6 3C6 3.55 6.45 4 7 4H8V9C8 10.66 6.66 12 5 12V14H10.97V21L11.97 22L12.97 21V14H19V12C17.34 12 16 10.66 16 9V4H17C17.55 4 18 3.55 18 3C18 2.45 17.55 2 17 2Z\" fill=\"currentColor\"/>","pinned-client-filled":"<path d=\"M14.525 14.3125C15.275 13.8542 15.8667 13.25 16.3 12.5C15.7167 12.0167 15.0583 11.6458 14.325 11.3875C13.5917 11.1292 12.8167 11 12 11C11.1833 11 10.4083 11.1292 9.675 11.3875C8.94167 11.6458 8.28333 12.0167 7.7 12.5C8.13333 13.25 8.725 13.8542 9.475 14.3125C10.225 14.7708 11.0667 15 12 15C12.9333 15 13.775 14.7708 14.525 14.3125ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10ZM12 22C9.31667 19.7167 7.3125 17.5958 5.9875 15.6375C4.6625 13.6792 4 11.8667 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8667 19.3375 13.6792 18.0125 15.6375C16.6875 17.5958 14.6833 19.7167 12 22Z\" fill=\"currentColor\"/>","pinned-client":"<path d=\"M12 15C12.9333 15 13.775 14.7707 14.525 14.312C15.275 13.854 15.8667 13.25 16.3 12.5C15.7167 12.0167 15.0583 11.6457 14.325 11.387C13.5917 11.129 12.8167 11 12 11C11.1833 11 10.4083 11.129 9.675 11.387C8.94167 11.6457 8.28333 12.0167 7.7 12.5C8.13333 13.25 8.725 13.854 9.475 14.312C10.225 14.7707 11.0667 15 12 15ZM12 10C12.55 10 13.021 9.804 13.413 9.412C13.8043 9.02067 14 8.55 14 8C14 7.45 13.8043 6.97933 13.413 6.588C13.021 6.196 12.55 6 12 6C11.45 6 10.9793 6.196 10.588 6.588C10.196 6.97933 10 7.45 10 8C10 8.55 10.196 9.02067 10.588 9.412C10.9793 9.804 11.45 10 12 10ZM12 19.35C14.0333 17.4833 15.5417 15.7873 16.525 14.262C17.5083 12.7373 18 11.3833 18 10.2C18 8.38333 17.4207 6.89567 16.262 5.737C15.104 4.579 13.6833 4 12 4C10.3167 4 8.89567 4.579 7.737 5.737C6.579 6.89567 6 8.38333 6 10.2C6 11.3833 6.49167 12.7373 7.475 14.262C8.45833 15.7873 9.96667 17.4833 12 19.35ZM12 22C9.31667 19.7167 7.31267 17.5957 5.988 15.637C4.66267 13.679 4 11.8667 4 10.2C4 7.7 4.80433 5.70833 6.413 4.225C8.021 2.74167 9.88333 2 12 2C14.1167 2 15.979 2.74167 17.587 4.225C19.1957 5.70833 20 7.7 20 10.2C20 11.8667 19.3377 13.679 18.013 15.637C16.6877 17.5957 14.6833 19.7167 12 22Z\" fill=\"currentColor\"/>","placeholder":"<path d=\"M13.9999 12.0001L11.9999 14.0001L9.99991 12.0001L11.9999 10.0001L13.9999 12.0001ZM11.9999 6.00006L14.1199 8.12006L16.6199 5.62006L11.9999 1.00006L7.37991 5.62006L9.87991 8.12006L11.9999 6.00006ZM5.99991 12.0001L8.11991 9.88006L5.61991 7.38006L0.999908 12.0001L5.61991 16.6201L8.11991 14.1201L5.99991 12.0001ZM17.9999 12.0001L15.8799 14.1201L18.3799 16.6201L22.9999 12.0001L18.3799 7.38006L15.8799 9.88006L17.9999 12.0001ZM11.9999 18.0001L9.87991 15.8801L7.37991 18.3801L11.9999 23.0001L16.6199 18.3801L14.1199 15.8801L11.9999 18.0001Z\" fill=\"currentColor\"/>","plans":"<path d=\"M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM4 11H8V6H4V11ZM10 11H14V6H10V11ZM16 11H20V6H16V11ZM8 18V13H4V18H8ZM10 18H14V13H10V18ZM16 18H20V13H16V18Z\" fill=\"currentColor\"/>","post":"<path d=\"M3 21V3H21V21H3ZM18 17H6V18.5H18V17ZM6 15.5H18V14H6V15.5ZM6 12H18V6H6V12Z\" fill=\"currentColor\"/>","preview":"<path d=\"M12 6.5C15.79 6.5 19.17 8.63 20.82 12C19.17 15.37 15.8 17.5 12 17.5C8.2 17.5 4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 9.5C13.38 9.5 14.5 10.62 14.5 12C14.5 13.38 13.38 14.5 12 14.5C10.62 14.5 9.5 13.38 9.5 12C9.5 10.62 10.62 9.5 12 9.5ZM12 7.5C9.52 7.5 7.5 9.52 7.5 12C7.5 14.48 9.52 16.5 12 16.5C14.48 16.5 16.5 14.48 16.5 12C16.5 9.52 14.48 7.5 12 7.5Z\" fill=\"currentColor\"/>","print":"<g clip-path=\"url(#print__clip0_7163_5655)\"> <path d=\"M19 8H18V3H6V8H5C3.34 8 2 9.34 2 11V17H6V21H18V17H22V11C22 9.34 20.66 8 19 8ZM8 5H16V8H8V5ZM16 17V19H8V15H16V17ZM18 15V13H6V15H4V11C4 10.45 4.45 10 5 10H19C19.55 10 20 10.45 20 11V15H18Z\" fill=\"currentColor\"/> <path d=\"M18 12.5C18.5523 12.5 19 12.0523 19 11.5C19 10.9477 18.5523 10.5 18 10.5C17.4477 10.5 17 10.9477 17 11.5C17 12.0523 17.4477 12.5 18 12.5Z\" fill=\"currentColor\"/> </g> <defs> <clipPath id=\"print__clip0_7163_5655\"> <rect width=\"24\" height=\"24\" fill=\"white\"/> </clipPath> </defs>","profile":"<path d=\"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7.35 18.5C8.66 17.56 10.26 17 12 17C13.74 17 15.34 17.56 16.65 18.5C15.34 19.44 13.74 20 12 20C10.26 20 8.66 19.44 7.35 18.5ZM18.14 17.12C16.45 15.8 14.32 15 12 15C9.68 15 7.55 15.8 5.86 17.12C4.7 15.73 4 13.95 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 13.95 19.3 15.73 18.14 17.12Z\" fill=\"currentColor\"/> <path d=\"M12 6C10.07 6 8.5 7.57 8.5 9.5C8.5 11.43 10.07 13 12 13C13.93 13 15.5 11.43 15.5 9.5C15.5 7.57 13.93 6 12 6ZM12 11C11.17 11 10.5 10.33 10.5 9.5C10.5 8.67 11.17 8 12 8C12.83 8 13.5 8.67 13.5 9.5C13.5 10.33 12.83 11 12 11Z\" fill=\"currentColor\"/>","programs":"<path d=\"M14 9.9V8.2C14.55 7.96667 15.1127 7.79167 15.688 7.675C16.2627 7.55833 16.8667 7.5 17.5 7.5C17.9333 7.5 18.3583 7.53333 18.775 7.6C19.1917 7.66667 19.6 7.75 20 7.85V9.45C19.6 9.3 19.196 9.18767 18.788 9.113C18.3793 9.03767 17.95 9 17.5 9C16.8667 9 16.2583 9.07933 15.675 9.238C15.0917 9.396 14.5333 9.61667 14 9.9ZM14 15.4V13.7C14.55 13.4667 15.1127 13.2917 15.688 13.175C16.2627 13.0583 16.8667 13 17.5 13C17.9333 13 18.3583 13.0333 18.775 13.1C19.1917 13.1667 19.6 13.25 20 13.35V14.95C19.6 14.8 19.196 14.6877 18.788 14.613C18.3793 14.5377 17.95 14.5 17.5 14.5C16.8667 14.5 16.2583 14.575 15.675 14.725C15.0917 14.875 14.5333 15.1 14 15.4ZM14 12.65V10.95C14.55 10.7167 15.1127 10.5417 15.688 10.425C16.2627 10.3083 16.8667 10.25 17.5 10.25C17.9333 10.25 18.3583 10.2833 18.775 10.35C19.1917 10.4167 19.6 10.5 20 10.6V12.2C19.6 12.05 19.196 11.9377 18.788 11.863C18.3793 11.7877 17.95 11.75 17.5 11.75C16.8667 11.75 16.2583 11.8293 15.675 11.988C15.0917 12.146 14.5333 12.3667 14 12.65ZM6.5 16C7.28333 16 8.046 16.0873 8.788 16.262C9.52933 16.4373 10.2667 16.7 11 17.05V7.2C10.3167 6.8 9.59167 6.5 8.825 6.3C8.05833 6.1 7.28333 6 6.5 6C5.9 6 5.30433 6.05833 4.713 6.175C4.121 6.29167 3.55 6.46667 3 6.7V16.6C3.58333 16.4 4.16267 16.25 4.738 16.15C5.31267 16.05 5.9 16 6.5 16ZM13 17.05C13.7333 16.7 14.471 16.4373 15.213 16.262C15.9543 16.0873 16.7167 16 17.5 16C18.1 16 18.6877 16.05 19.263 16.15C19.8377 16.25 20.4167 16.4 21 16.6V6.7C20.45 6.46667 19.8793 6.29167 19.288 6.175C18.696 6.05833 18.1 6 17.5 6C16.7167 6 15.9417 6.1 15.175 6.3C14.4083 6.5 13.6833 6.8 13 7.2V17.05ZM12 20C11.2 19.3667 10.3333 18.875 9.4 18.525C8.46667 18.175 7.5 18 6.5 18C5.8 18 5.11267 18.0917 4.438 18.275C3.76267 18.4583 3.11667 18.7167 2.5 19.05C2.15 19.2333 1.81267 19.225 1.488 19.025C1.16267 18.825 1 18.5333 1 18.15V6.1C1 5.91667 1.046 5.74167 1.138 5.575C1.22933 5.40833 1.36667 5.28333 1.55 5.2C2.31667 4.8 3.11667 4.5 3.95 4.3C4.78333 4.1 5.63333 4 6.5 4C7.46667 4 8.41267 4.125 9.338 4.375C10.2627 4.625 11.15 5 12 5.5C12.85 5 13.7377 4.625 14.663 4.375C15.5877 4.125 16.5333 4 17.5 4C18.3667 4 19.2167 4.1 20.05 4.3C20.8833 4.5 21.6833 4.8 22.45 5.2C22.6333 5.28333 22.771 5.40833 22.863 5.575C22.9543 5.74167 23 5.91667 23 6.1V18.15C23 18.5333 22.8377 18.825 22.513 19.025C22.1877 19.225 21.85 19.2333 21.5 19.05C20.8833 18.7167 20.2373 18.4583 19.562 18.275C18.8873 18.0917 18.2 18 17.5 18C16.5 18 15.5333 18.175 14.6 18.525C13.6667 18.875 12.8 19.3667 12 20Z\" fill=\"currentColor\"/>","progress":"<path d=\"M12 22C10.6333 22 9.34167 21.7375 8.125 21.2125C6.90833 20.6875 5.84583 19.9708 4.9375 19.0625C4.02917 18.1542 3.3125 17.0917 2.7875 15.875C2.2625 14.6583 2 13.3667 2 12C2 10.6167 2.2625 9.32083 2.7875 8.1125C3.3125 6.90417 4.02917 5.84583 4.9375 4.9375C5.84583 4.02917 6.90833 3.3125 8.125 2.7875C9.34167 2.2625 10.6333 2 12 2C12.2833 2 12.5208 2.09583 12.7125 2.2875C12.9042 2.47917 13 2.71667 13 3C13 3.28333 12.9042 3.52083 12.7125 3.7125C12.5208 3.90417 12.2833 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7167 20.0958 11.4792 20.2875 11.2875C20.4792 11.0958 20.7167 11 21 11C21.2833 11 21.5208 11.0958 21.7125 11.2875C21.9042 11.4792 22 11.7167 22 12C22 13.3667 21.7375 14.6583 21.2125 15.875C20.6875 17.0917 19.9708 18.1542 19.0625 19.0625C18.1542 19.9708 17.0958 20.6875 15.8875 21.2125C14.6792 21.7375 13.3833 22 12 22Z\" fill=\"currentColor\"/>","protocol":"<path d=\"M11 15H17V17H11V15ZM9 7H7V9H9V7ZM11 13H17V11H11V13ZM11 9H17V7H11V9ZM9 11H7V13H9V11ZM21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5ZM19 5H5V19H19V5ZM9 15H7V17H9V15Z\" fill=\"currentColor\"/>","radio-blank":"<path d=\"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z\" fill=\"currentColor\"/>","radio-filled":"<path d=\"M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z\" fill=\"currentColor\"/>","receipt":"<path d=\"M3 22V2L4.5 3.5L6 2L7.5 3.5L9 2L10.5 3.5L12 2L13.5 3.5L15 2L16.5 3.5L18 2L19.5 3.5L21 2V22L19.5 20.5L18 22L16.5 20.5L15 22L13.5 20.5L12 22L10.5 20.5L9 22L7.5 20.5L6 22L4.5 20.5L3 22ZM6 17H18V15H6V17ZM6 13H18V11H6V13ZM6 9H18V7H6V9ZM5 19.1H19V4.9H5V19.1Z\" fill=\"currentColor\"/>","recipes":"<path d=\"M6 15C5.16667 15 4.45833 14.7084 3.875 14.125C3.29167 13.5417 3 12.8334 3 12V8.00005H16.025C16.1083 7.45005 16.3333 6.95838 16.7 6.52505C17.0667 6.09172 17.5167 5.78338 18.05 5.60005L22.675 4.05005L23.3 5.95005L18.675 7.50005C18.475 7.56672 18.3125 7.68755 18.1875 7.86255C18.0625 8.03755 18 8.23338 18 8.45005V12C18 12.8334 17.7083 13.5417 17.125 14.125C16.5417 14.7084 15.8333 15 15 15H6ZM6 13H15C15.2833 13 15.5208 12.9042 15.7125 12.7125C15.9042 12.5209 16 12.2834 16 12V10H5V12C5 12.2834 5.09583 12.5209 5.2875 12.7125C5.47917 12.9042 5.71667 13 6 13ZM9 21V18H2V16H9C9.55 16 10.0208 16.1959 10.4125 16.5875C10.8042 16.9792 11 17.45 11 18V21H9ZM13 21V18C13 17.45 13.1958 16.9792 13.5875 16.5875C13.9792 16.1959 14.45 16 15 16H22V18H15V21H13Z\" fill=\"currentColor\"/>","redo":"<path d=\"M18.4 10.6C16.55 8.99 14.15 8 11.5 8C6.85001 8 2.92001 11.03 1.54001 15.22L3.90001 16C4.95001 12.81 7.95001 10.5 11.5 10.5C13.45 10.5 15.23 11.22 16.62 12.38L13 16H22V7L18.4 10.6Z\" fill=\"currentColor\"/>","refer":"<path d=\"M15.0001 10.25C15.4142 10.2501 15.7501 10.5859 15.7501 11V11.0098C15.75 11.4239 15.4141 11.7597 15.0001 11.7598C14.5859 11.7598 14.2502 11.4239 14.2501 11.0098V11C14.2501 10.5858 14.5859 10.2501 15.0001 10.25Z\" fill=\"currentColor\"/> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.93757 2.40336C6.60058 2.20727 7.30493 2.19785 7.97272 2.37699C8.64045 2.55615 9.24593 2.91645 9.72175 3.41801C10.1975 3.91964 10.5253 4.54348 10.669 5.21976C10.7412 5.55973 10.7652 5.90644 10.7423 6.25004H11.2725L15.5841 3.37601C15.8141 3.22268 16.1098 3.20857 16.3536 3.3389C16.5974 3.46942 16.7501 3.72345 16.7501 4.00004V7.38871C17.8083 8.09706 18.6448 9.08873 19.1641 10.25H19.9991C20.4632 10.25 20.9082 10.4346 21.2364 10.7627C21.5646 11.0909 21.7491 11.5359 21.7491 12V14C21.7491 14.4641 21.5646 14.9092 21.2364 15.2373C20.9082 15.5655 20.4632 15.75 19.9991 15.75H19.1612C18.8207 16.5122 18.3422 17.2045 17.7491 17.793V19.5C17.7491 20.0968 17.5119 20.6689 17.0899 21.0909C16.668 21.5128 16.0958 21.75 15.4991 21.75C14.9024 21.75 14.3302 21.5128 13.9083 21.0909C13.5443 20.7269 13.3181 20.2511 13.2628 19.7442C13.175 19.7475 13.087 19.7501 12.9991 19.75H8.99909C8.91083 19.7501 8.82258 19.7476 8.73444 19.7442C8.67908 20.251 8.45387 20.7269 8.08991 21.0909C7.66796 21.5128 7.0958 21.75 6.49909 21.75C5.90238 21.75 5.33021 21.5128 4.90827 21.0909C4.48633 20.6689 4.2491 20.0968 4.24909 19.5V17.795C3.36265 16.917 2.73402 15.8096 2.43854 14.5928C2.11595 13.2643 2.20469 11.869 2.69245 10.5918C3.01005 9.76026 3.48765 9.00454 4.09284 8.36429C3.8434 8.05783 3.64178 7.71325 3.49909 7.34086C3.25175 6.69518 3.18812 5.99329 3.31452 5.31351C3.44094 4.63373 3.75297 4.00193 4.21589 3.48832C4.67878 2.97483 5.27463 2.59945 5.93757 2.40336ZM11.9151 7.62406C11.7919 7.70613 11.6471 7.75003 11.4991 7.75004H9.86237C9.85457 7.75039 9.84676 7.74993 9.83893 7.75004H8.99909C7.93575 7.74988 6.89743 8.07291 6.02155 8.67582C5.14565 9.27881 4.47323 10.1336 4.09382 11.127C3.71443 12.1204 3.64562 13.2059 3.89655 14.2393C4.14754 15.2725 4.70642 16.2054 5.49909 16.9141C5.65805 17.0563 5.74899 17.2594 5.74909 17.4727V19.5C5.7491 19.6989 5.82818 19.8897 5.96882 20.0303C6.10945 20.1709 6.30021 20.25 6.49909 20.25C6.69797 20.25 6.88872 20.1709 7.02936 20.0303C7.17 19.8897 7.24908 19.6989 7.24909 19.5V18.917C7.24909 18.6965 7.34639 18.4873 7.51471 18.3448C7.6831 18.2023 7.90561 18.1413 8.12311 18.1778C8.41212 18.2263 8.70505 18.2503 8.99811 18.25H13.0001C13.2931 18.2503 13.5861 18.2263 13.8751 18.1778C14.0926 18.1413 14.3151 18.2023 14.4835 18.3448C14.6518 18.4873 14.7491 18.6965 14.7491 18.917V19.5L14.7637 19.6475C14.7926 19.7915 14.8635 19.9249 14.9688 20.0303C15.1095 20.1709 15.3002 20.25 15.4991 20.25C15.698 20.25 15.8887 20.1709 16.0294 20.0303C16.17 19.8897 16.2491 19.6989 16.2491 19.5V17.4727C16.2492 17.2597 16.3395 17.0563 16.4981 16.9141C17.1561 16.3244 17.6564 15.5807 17.9503 14.75L17.9981 14.6426C18.1277 14.4036 18.3792 14.2501 18.6573 14.25H19.9991C20.0654 14.25 20.129 14.2236 20.1758 14.1768C20.2227 14.1299 20.2491 14.0663 20.2491 14V12C20.2491 11.9337 20.2227 11.8702 20.1758 11.8233C20.129 11.7764 20.0654 11.75 19.9991 11.75H18.6583C18.3408 11.75 18.0575 11.5501 17.9512 11.251C17.5326 10.0714 16.7075 9.07915 15.6241 8.45218C15.3926 8.31808 15.2501 8.07032 15.2501 7.80277V5.40043L11.9151 7.62406ZM7.58405 3.82621C7.18345 3.71873 6.7611 3.72425 6.36335 3.84183C5.96572 3.95945 5.60784 4.18429 5.33014 4.49222C5.05241 4.80038 4.86498 5.18007 4.78913 5.58793C4.71337 5.99562 4.7512 6.41649 4.89948 6.80375C4.98156 7.01801 5.09622 7.21717 5.23737 7.39554C6.34944 6.64927 7.65862 6.24986 8.99909 6.25004H9.23639C9.26318 6.01115 9.25258 5.76847 9.20221 5.53129C9.11599 5.12556 8.9193 4.75118 8.63385 4.45023C8.34835 4.14925 7.98473 3.93372 7.58405 3.82621Z\" fill=\"currentColor\"/>","reload":"<path d=\"M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58001 4 4.01001 7.58 4.01001 12C4.01001 16.42 7.58001 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69001 18 6.00001 15.31 6.00001 12C6.00001 8.69 8.69001 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z\" fill=\"currentColor\"/>","remove":"<path d=\"M19 13H5V11H19V13Z\" fill=\"currentColor\"/>","reporting":"<path d=\"M16 11.78L20.24 4.45L21.97 5.45L16.74 14.5L10.23 10.75L5.46 19H22V21H2V3H4V17.54L9.5 8L16 11.78Z\" fill=\"currentColor\"/>","scale":"<path d=\"M4.00005 22V19.4141L2.70708 20.707C2.31655 21.0976 1.68354 21.0976 1.29302 20.707C0.902491 20.3165 0.902491 19.6835 1.29302 19.293L4.00005 16.5859V14.4141L2.70708 15.707C2.31655 16.0976 1.68354 16.0976 1.29302 15.707C0.902491 15.3165 0.902491 14.6835 1.29302 14.293L4.29302 11.293L4.36919 11.2246C4.76196 10.9043 5.34096 10.9269 5.70708 11.293L8.70708 14.293C9.0976 14.6835 9.0976 15.3165 8.70708 15.707C8.31655 16.0976 7.68354 16.0976 7.29302 15.707L6.00005 14.4141V16.5859L8.70708 19.293C9.0976 19.6835 9.0976 20.3165 8.70708 20.707C8.31655 21.0976 7.68354 21.0976 7.29302 20.707L6.00005 19.4141V22C6.00005 22.5523 5.55233 23 5.00005 23C4.44776 23 4.00005 22.5523 4.00005 22ZM18 22V19.4141L16.7071 20.707C16.3166 21.0976 15.6835 21.0976 15.293 20.707C14.9025 20.3165 14.9025 19.6835 15.293 19.293L18 16.5859V14.4141L16.7071 15.707C16.3166 16.0976 15.6835 16.0976 15.293 15.707C14.9025 15.3165 14.9025 14.6835 15.293 14.293L18.293 11.293L18.3692 11.2246C18.762 10.9043 19.341 10.9269 19.7071 11.293L22.7071 14.293C23.0976 14.6835 23.0976 15.3165 22.7071 15.707C22.3166 16.0976 21.6835 16.0976 21.293 15.707L20 14.4141V16.5859L22.7071 19.293C23.0976 19.6835 23.0976 20.3165 22.7071 20.707C22.3166 21.0976 21.6835 21.0976 21.293 20.707L20 19.4141V22C20 22.5523 19.5523 23 19 23C18.4478 23 18 22.5523 18 22ZM11 12V9.41407L9.70708 10.707C9.31655 11.0976 8.68354 11.0976 8.29302 10.707C7.90249 10.3165 7.90249 9.6835 8.29302 9.29298L11 6.58595V4.41407L9.70708 5.70704C9.31655 6.09757 8.68354 6.09757 8.29302 5.70704C7.90249 5.31652 7.90249 4.6835 8.29302 4.29298L11.293 1.29298L11.3692 1.22462C11.762 0.904269 12.341 0.926863 12.7071 1.29298L15.7071 4.29298C16.0976 4.6835 16.0976 5.31652 15.7071 5.70704C15.3166 6.09757 14.6835 6.09757 14.293 5.70704L13 4.41407V6.58595L15.7071 9.29298C16.0976 9.6835 16.0976 10.3165 15.7071 10.707C15.3166 11.0976 14.6835 11.0976 14.293 10.707L13 9.41407V12C13 12.5523 12.5523 13 12 13C11.4478 13 11 12.5523 11 12Z\" fill=\"currentColor\"/>","search":"<path d=\"M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z\" fill=\"currentColor\"/>","security":"<path d=\"M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z\" fill=\"currentColor\"/>","select-all":"<path d=\"M3 5H5V3C3.9 3 3 3.9 3 5ZM3 13H5V11H3V13ZM7 21H9V19H7V21ZM3 9H5V7H3V9ZM13 3H11V5H13V3ZM19 3V5H21C21 3.9 20.1 3 19 3ZM5 21V19H3C3 20.1 3.9 21 5 21ZM3 17H5V15H3V17ZM9 3H7V5H9V3ZM11 21H13V19H11V21ZM19 13H21V11H19V13ZM19 21C20.1 21 21 20.1 21 19H19V21ZM19 9H21V7H19V9ZM19 17H21V15H19V17ZM15 21H17V19H15V21ZM15 5H17V3H15V5ZM7 17H17V7H7V17ZM9 9H15V15H9V9Z\" fill=\"currentColor\"/>","select-multiple":"<path d=\"M20 2H8C6.897 2 6 2.897 6 4V16C6 17.103 6.897 18 8 18H20C21.103 18 22 17.103 22 16V4C22 2.897 21.103 2 20 2ZM8 16V4H20L20.002 16H8Z\" fill=\"currentColor\"/> <path d=\"M4 8H2V20C2 21.103 2.897 22 4 22H16V20H4V8ZM12.933 11.519L11.207 9.793L9.793 11.207L13.067 14.481L18.769 7.641L17.231 6.359L12.933 11.519Z\" fill=\"currentColor\"/>","send":"<path d=\"M4.01 6.03L11.52 9.25L4 8.25L4.01 6.03ZM11.51 14.75L4 17.97V15.75L11.51 14.75ZM2.01 3L2 10L17 12L2 14L2.01 21L23 12L2.01 3Z\" fill=\"currentColor\"/>","services":"<path d=\"M4 22V11H2V5H7.2C7.11667 4.85 7.0625 4.69167 7.0375 4.525C7.0125 4.35833 7 4.18333 7 4C7 3.16667 7.29167 2.45833 7.875 1.875C8.45833 1.29167 9.16667 1 10 1C10.3833 1 10.7417 1.07083 11.075 1.2125C11.4083 1.35417 11.7167 1.55 12 1.8C12.2833 1.53333 12.5917 1.33333 12.925 1.2C13.2583 1.06667 13.6167 1 14 1C14.8333 1 15.5417 1.29167 16.125 1.875C16.7083 2.45833 17 3.16667 17 4C17 4.18333 16.9833 4.35417 16.95 4.5125C16.9167 4.67083 16.8667 4.83333 16.8 5H22V11H20V22H4ZM14 3C13.7167 3 13.4792 3.09583 13.2875 3.2875C13.0958 3.47917 13 3.71667 13 4C13 4.28333 13.0958 4.52083 13.2875 4.7125C13.4792 4.90417 13.7167 5 14 5C14.2833 5 14.5208 4.90417 14.7125 4.7125C14.9042 4.52083 15 4.28333 15 4C15 3.71667 14.9042 3.47917 14.7125 3.2875C14.5208 3.09583 14.2833 3 14 3ZM9 4C9 4.28333 9.09583 4.52083 9.2875 4.7125C9.47917 4.90417 9.71667 5 10 5C10.2833 5 10.5208 4.90417 10.7125 4.7125C10.9042 4.52083 11 4.28333 11 4C11 3.71667 10.9042 3.47917 10.7125 3.2875C10.5208 3.09583 10.2833 3 10 3C9.71667 3 9.47917 3.09583 9.2875 3.2875C9.09583 3.47917 9 3.71667 9 4ZM4 7V9H11V7H4ZM11 20V11H6V20H11ZM13 20H18V11H13V20ZM20 9V7H13V9H20Z\" fill=\"currentColor\"/>","settings":"<path d=\"M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.57 5.11 19.4 5.02 19.22 5.02C19.16 5.02 19.1 5.03 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H9.99996C9.74996 2 9.53996 2.18 9.50996 2.42L9.12996 5.07C8.51996 5.32 7.95996 5.66 7.43996 6.05L4.94996 5.05C4.88996 5.03 4.82996 5.02 4.76996 5.02C4.59996 5.02 4.42996 5.11 4.33996 5.27L2.33996 8.73C2.20996 8.95 2.26996 9.22 2.45996 9.37L4.56996 11.02C4.52996 11.34 4.49996 11.67 4.49996 12C4.49996 12.33 4.52996 12.66 4.56996 12.98L2.45996 14.63C2.26996 14.78 2.21996 15.05 2.33996 15.27L4.33996 18.73C4.42996 18.89 4.59996 18.98 4.77996 18.98C4.83996 18.98 4.89996 18.97 4.94996 18.95L7.43996 17.95C7.95996 18.35 8.51996 18.68 9.12996 18.93L9.50996 21.58C9.53996 21.82 9.74996 22 9.99996 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.11 18.97 19.17 18.98 19.23 18.98C19.4 18.98 19.57 18.89 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98ZM17.45 11.27C17.49 11.58 17.5 11.79 17.5 12C17.5 12.21 17.48 12.43 17.45 12.73L17.31 13.86L18.2 14.56L19.28 15.4L18.58 16.61L17.31 16.1L16.27 15.68L15.37 16.36C14.94 16.68 14.53 16.92 14.12 17.09L13.06 17.52L12.9 18.65L12.7 20H11.3L11.11 18.65L10.95 17.52L9.88996 17.09C9.45996 16.91 9.05996 16.68 8.65996 16.38L7.74996 15.68L6.68996 16.11L5.41996 16.62L4.71996 15.41L5.79996 14.57L6.68996 13.87L6.54996 12.74C6.51996 12.43 6.49996 12.2 6.49996 12C6.49996 11.8 6.51996 11.57 6.54996 11.27L6.68996 10.14L5.79996 9.44L4.71996 8.6L5.41996 7.39L6.68996 7.9L7.72996 8.32L8.62996 7.64C9.05996 7.32 9.46996 7.08 9.87996 6.91L10.94 6.48L11.1 5.35L11.3 4H12.69L12.88 5.35L13.04 6.48L14.1 6.91C14.53 7.09 14.93 7.32 15.33 7.62L16.24 8.32L17.3 7.89L18.57 7.38L19.27 8.59L18.2 9.44L17.31 10.14L17.45 11.27ZM12 8C9.78996 8 7.99996 9.79 7.99996 12C7.99996 14.21 9.78996 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM12 14C10.9 14 9.99996 13.1 9.99996 12C9.99996 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z\" fill=\"currentColor\"/>","share":"<path d=\"M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08ZM18 4C18.55 4 19 4.45 19 5C19 5.55 18.55 6 18 6C17.45 6 17 5.55 17 5C17 4.45 17.45 4 18 4ZM6 13C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11C6.55 11 7 11.45 7 12C7 12.55 6.55 13 6 13ZM18 20.02C17.45 20.02 17 19.57 17 19.02C17 18.47 17.45 18.02 18 18.02C18.55 18.02 19 18.47 19 19.02C19 19.57 18.55 20.02 18 20.02Z\" fill=\"currentColor\"/>","sign-out":"<path d=\"M17 8L15.59 9.41L17.17 11H9V13H17.17L15.59 14.58L17 16L21 12L17 8ZM5 5H12V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H12V19H5V5Z\" fill=\"currentColor\"/>","square-filled":"<path d=\"M5 21C4.45 21 3.979 20.8043 3.587 20.413C3.19567 20.021 3 19.55 3 19V5C3 4.45 3.19567 3.979 3.587 3.587C3.979 3.19567 4.45 3 5 3H19C19.55 3 20.021 3.19567 20.413 3.587C20.8043 3.979 21 4.45 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.021 20.8043 19.55 21 19 21H5Z\" fill=\"currentColor\"/>","star-filled":"<path d=\"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z\" fill=\"currentColor\"/>","star-half":"<path d=\"M22 9.24L14.81 8.62L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.55 13.97L22 9.24ZM12 15.4V6.1L13.71 10.14L18.09 10.52L14.77 13.4L15.77 17.68L12 15.4Z\" fill=\"currentColor\"/>","star-outline":"<path d=\"M22 9.24L14.81 8.62L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.55 13.97L22 9.24ZM12 15.4L8.24 17.67L9.24 13.39L5.92 10.51L10.3 10.13L12 6.1L13.71 10.14L18.09 10.52L14.77 13.4L15.77 17.68L12 15.4Z\" fill=\"currentColor\"/>","status":"<mask id=\"status__mask0_10195_42790\" style=\"mask-type:alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"24\" height=\"24\"> <rect width=\"24\" height=\"24\" fill=\"#D9D9D9\"/> </mask> <g mask=\"url(#status__mask0_10195_42790)\"> <path d=\"M12 18C11.17 18 10.39 17.8425 9.66 17.5275C8.93 17.2125 8.295 16.785 7.755 16.245C7.215 15.705 6.7875 15.07 6.4725 14.34C6.1575 13.61 6 12.83 6 12C6 11.17 6.1575 10.39 6.4725 9.66C6.7875 8.93 7.215 8.295 7.755 7.755C8.295 7.215 8.93 6.7875 9.66 6.4725C10.39 6.1575 11.17 6 12 6C12.83 6 13.61 6.1575 14.34 6.4725C15.07 6.7875 15.705 7.215 16.245 7.755C16.785 8.295 17.2125 8.93 17.5275 9.66C17.8425 10.39 18 11.17 18 12C18 12.83 17.8425 13.61 17.5275 14.34C17.2125 15.07 16.785 15.705 16.245 16.245C15.705 16.785 15.07 17.2125 14.34 17.5275C13.61 17.8425 12.83 18 12 18Z\" fill=\"currentColor\"/> </g>","success":"<path d=\"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z\" fill=\"currentColor\"/>","supplement":"<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7 4C7 3.46957 7.21071 2.96086 7.58579 2.58579C7.96086 2.21071 8.46957 2 9 2H15C15.5304 2 16.0391 2.21071 16.4142 2.58579C16.7893 2.96086 17 3.46957 17 4V5C17 5.378 16.895 5.732 16.712 6.034L18.4 7.3C18.8968 7.67259 19.3 8.15572 19.5777 8.71115C19.8554 9.26657 20 9.87902 20 10.5V18C20 19.0609 19.5786 20.0783 18.8284 20.8284C18.0783 21.5786 17.0609 22 16 22H8C6.93913 22 5.92172 21.5786 5.17157 20.8284C4.42143 20.0783 4 19.0609 4 18V10.5C4 9.87902 4.14458 9.26657 4.42229 8.71115C4.7 8.15572 5.10322 7.67259 5.6 7.3L7.288 6.034C7.09958 5.72201 6.99999 5.36447 7 5V4ZM9.667 7C9.45063 7 9.2401 7.07018 9.067 7.2L6.8 8.9C6.55161 9.08629 6.35 9.32786 6.21115 9.60557C6.07229 9.88328 6 10.1895 6 10.5V11H18V10.5C18 10.1895 17.9277 9.88328 17.7889 9.60557C17.65 9.32786 17.4484 9.08629 17.2 8.9L14.933 7.2C14.7599 7.07018 14.5494 7 14.333 7H9.667ZM18 13H6V15H18V13ZM18 17H6V18C6 18.5304 6.21071 19.0391 6.58579 19.4142C6.96086 19.7893 7.46957 20 8 20H16C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18V17ZM15 5V4H9V5H15Z\" fill=\"currentColor\"/>","supplement-database":"<path d=\"M12 9.025C13.4333 9.025 14.9125 8.80833 16.4375 8.375C17.9625 7.94167 18.8167 7.49167 19 7.025C18.8167 6.54167 17.9792 6.08333 16.4875 5.65C14.9958 5.21667 13.5 5 12 5C10.4833 5 8.99583 5.2125 7.5375 5.6375C6.07917 6.0625 5.23333 6.525 5 7.025C5.25 7.50833 6.12083 7.9625 7.6125 8.3875C9.10417 8.8125 10.5667 9.025 12 9.025ZM10.475 18.925C10.6417 19.3083 10.8333 19.675 11.05 20.025C11.2667 20.375 11.5167 20.7 11.8 21C10.5833 20.9833 9.4375 20.8708 8.3625 20.6625C7.2875 20.4542 6.35417 20.1708 5.5625 19.8125C4.77083 19.4542 4.14583 19.0333 3.6875 18.55C3.22917 18.0667 3 17.55 3 17V7C3 6.45 3.2375 5.93333 3.7125 5.45C4.1875 4.96667 4.83333 4.54167 5.65 4.175C6.46667 3.80833 7.42083 3.52083 8.5125 3.3125C9.60417 3.10417 10.7667 3 12 3C13.2333 3 14.3958 3.10417 15.4875 3.3125C16.5792 3.52083 17.5333 3.80833 18.35 4.175C19.1667 4.54167 19.8125 4.96667 20.2875 5.45C20.7625 5.93333 21 6.45 21 7C21 7.55 20.7625 8.06667 20.2875 8.55C19.8125 9.03333 19.1667 9.45833 18.35 9.825C17.5333 10.1917 16.5792 10.4792 15.4875 10.6875C14.3958 10.8958 13.2333 11 12 11C10.5833 11 9.275 10.875 8.075 10.625C6.875 10.375 5.85 10.0083 5 9.525V12.05C5.66667 12.6667 6.5 13.1167 7.5 13.4C8.5 13.6833 9.50833 13.8667 10.525 13.95C10.3917 14.2 10.2833 14.4875 10.2 14.8125C10.1167 15.1375 10.0583 15.5 10.025 15.9C9.025 15.7833 8.09583 15.6167 7.2375 15.4C6.37917 15.1833 5.63333 14.8917 5 14.525V17C5.23333 17.4167 5.875 17.8083 6.925 18.175C7.975 18.5417 9.15833 18.7917 10.475 18.925ZM21.6 23L18.9 20.3C18.5333 20.5167 18.15 20.6875 17.75 20.8125C17.35 20.9375 16.9333 21 16.5 21C15.25 21 14.1875 20.5625 13.3125 19.6875C12.4375 18.8125 12 17.75 12 16.5C12 15.25 12.4375 14.1875 13.3125 13.3125C14.1875 12.4375 15.25 12 16.5 12C17.75 12 18.8125 12.4375 19.6875 13.3125C20.5625 14.1875 21 15.25 21 16.5C21 16.9333 20.9375 17.35 20.8125 17.75C20.6875 18.15 20.5167 18.5333 20.3 18.9L23 21.6L21.6 23ZM18.275 18.275C18.7583 17.7917 19 17.2 19 16.5C19 15.8 18.7583 15.2083 18.275 14.725C17.7917 14.2417 17.2 14 16.5 14C15.8 14 15.2083 14.2417 14.725 14.725C14.2417 15.2083 14 15.8 14 16.5C14 17.2 14.2417 17.7917 14.725 18.275C15.2083 18.7583 15.8 19 16.5 19C17.2 19 17.7917 18.7583 18.275 18.275Z\" fill=\"currentColor\"/>","support":"<path d=\"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM19.46 9.12L16.68 10.27C16.17 8.91 15.1 7.83 13.73 7.33L14.88 4.55C16.98 5.35 18.65 7.02 19.46 9.12ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15ZM9.13 4.54L10.3 7.32C8.92 7.82 7.83 8.91 7.32 10.29L4.54 9.13C5.35 7.02 7.02 5.35 9.13 4.54ZM4.54 14.87L7.32 13.72C7.83 15.1 8.91 16.18 10.29 16.68L9.12 19.46C7.02 18.65 5.35 16.98 4.54 14.87ZM14.88 19.46L13.73 16.68C15.1 16.17 16.18 15.09 16.68 13.71L19.46 14.88C18.65 16.98 16.98 18.65 14.88 19.46Z\" fill=\"currentColor\"/>","table":"<path d=\"M3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.0007 4.45067 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19ZM5 9H19V5H5V9ZM10.325 14H13.675V11H10.325V14ZM10.325 19H13.675V16H10.325V19ZM5 14H8.325V11H5V14ZM15.675 14H19V11H15.675V14ZM5 19H8.325V16H5V19ZM15.675 19H19V16H15.675V19Z\" fill=\"currentColor\"/>","tag":"<path d=\"M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7V17C3 18.1 3.9 18.99 5 18.99L16 19C16.67 19 17.27 18.67 17.63 18.16L22 12L17.63 5.84ZM16 17H5V7H16L19.55 12L16 17Z\" fill=\"currentColor\"/>","target":"<path d=\"M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20ZM12 18C10.3333 18 8.91667 17.4167 7.75 16.25C6.58333 15.0833 6 13.6667 6 12C6 10.3333 6.58333 8.91667 7.75 7.75C8.91667 6.58333 10.3333 6 12 6C13.6667 6 15.0833 6.58333 16.25 7.75C17.4167 8.91667 18 10.3333 18 12C18 13.6667 17.4167 15.0833 16.25 16.25C15.0833 17.4167 13.6667 18 12 18ZM12 16C13.1 16 14.0417 15.6083 14.825 14.825C15.6083 14.0417 16 13.1 16 12C16 10.9 15.6083 9.95833 14.825 9.175C14.0417 8.39167 13.1 8 12 8C10.9 8 9.95833 8.39167 9.175 9.175C8.39167 9.95833 8 10.9 8 12C8 13.1 8.39167 14.0417 9.175 14.825C9.95833 15.6083 10.9 16 12 16ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14Z\" fill=\"currentColor\"/>","tasks":"<path d=\"M6.50005 8H7.50005V7C7.50005 6.71667 7.40405 6.47933 7.21205 6.288C7.02005 6.09667 6.78272 6.00067 6.50005 6C6.21672 6 5.97938 6.096 5.78805 6.288C5.59672 6.48 5.50072 6.71733 5.50005 7C5.50005 7.28333 5.59605 7.521 5.78805 7.713C5.98005 7.905 6.21738 8.00067 6.50005 8ZM11 8C11.2834 8 11.521 7.904 11.713 7.712C11.905 7.52 12.0007 7.28267 12 7C12 6.71667 11.904 6.47933 11.712 6.288C11.52 6.09667 11.2827 6.00067 11 6C10.7167 6 10.4794 6.096 10.288 6.288C10.0967 6.48 10.0007 6.71733 10 7V8H11ZM10.475 22C10.0084 22 9.57105 21.9 9.16305 21.7C8.75505 21.5 8.40905 21.2167 8.12505 20.85L2.67505 13.925L3.15005 13.425C3.48338 13.075 3.88338 12.8667 4.35005 12.8C4.81672 12.7333 5.25005 12.825 5.65005 13.075L7.50005 14.2V10H6.50005C5.66672 10 4.95838 9.70833 4.37505 9.125C3.79172 8.54167 3.50005 7.83333 3.50005 7C3.50005 6.16667 3.79172 5.45833 4.37505 4.875C4.95838 4.29167 5.66672 4 6.50005 4C6.68338 4 6.85438 4.01667 7.01305 4.05C7.17172 4.08333 7.33405 4.125 7.50005 4.175V3C7.50005 2.71667 7.59605 2.47933 7.78805 2.288C7.98005 2.09667 8.21738 2.00067 8.50005 2C8.78338 2 9.02505 2.096 9.22505 2.288C9.42505 2.48 9.52505 2.71733 9.52505 3V4.4C9.75838 4.26667 9.99605 4.16667 10.238 4.1C10.48 4.03333 10.734 4 11 4C11.8334 4 12.5417 4.29167 13.125 4.875C13.7084 5.45833 14 6.16667 14 7C14 7.83333 13.7084 8.54167 13.125 9.125C12.5417 9.70833 11.8334 10 11 10H9.52505V17.8L7.10005 16.3L9.70005 19.625C9.80005 19.7417 9.91672 19.8333 10.05 19.9C10.1834 19.9667 10.325 20 10.475 20H16C16.55 20 17.021 19.8043 17.413 19.413C17.805 19.0217 18.0007 18.5507 18 18V14C18 13.7167 17.904 13.4793 17.712 13.288C17.52 13.0967 17.2827 13.0007 17 13H11.525V11H17C17.8334 11 18.5417 11.2917 19.125 11.875C19.7084 12.4583 20 13.1667 20 14V18C20 19.1 19.6084 20.0417 18.8251 20.825C18.0417 21.6083 17.1 22 16 22H10.475Z\" fill=\"currentColor\"/>","templates":"<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V7C21 7.53043 20.7893 8.03914 20.4142 8.41421C20.0391 8.78929 19.5304 9 19 9H5C4.46957 9 3.96086 8.78929 3.58579 8.41421C3.21071 8.03914 3 7.53043 3 7V5C3 4.46957 3.21071 3.96086 3.58579 3.58579ZM19 5H5L5 7H19V5ZM3.58579 11.5858C3.96086 11.2107 4.46957 11 5 11H11C11.5304 11 12.0391 11.2107 12.4142 11.5858C12.7893 11.9609 13 12.4696 13 13V19C13 19.5304 12.7893 20.0391 12.4142 20.4142C12.0391 20.7893 11.5304 21 11 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V13C3 12.4696 3.21071 11.9609 3.58579 11.5858ZM11 13H5L5 19H11V13ZM15.5858 11.5858C15.9609 11.2107 16.4696 11 17 11H19C19.5304 11 20.0391 11.2107 20.4142 11.5858C20.7893 11.9609 21 12.4696 21 13V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H17C16.4696 21 15.9609 20.7893 15.5858 20.4142C15.2107 20.0391 15 19.5304 15 19V13C15 12.4696 15.2107 11.9609 15.5858 11.5858ZM19 13H17L17 19H19V13Z\" fill=\"currentColor\"/>","terms":"<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M20 3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3ZM20 19H4V5H20V19Z\" fill=\"currentColor\"/> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M19.41 10.42L17.99 9L14.82 12.17L13.41 10.75L12 12.16L14.82 15L19.41 10.42Z\" fill=\"currentColor\"/> <path d=\"M10 7H5V9H10V7Z\" fill=\"currentColor\"/> <path d=\"M10 11H5V13H10V11Z\" fill=\"currentColor\"/> <path d=\"M10 15H5V17H10V15Z\" fill=\"currentColor\"/>","thumb-down-dislike":"<path d=\"M3 16C2.46667 16 2 15.8 1.6 15.4C1.2 15 1 14.5333 1 14V12C1 11.8833 1.01667 11.7583 1.05 11.625C1.08333 11.4917 1.11667 11.3667 1.15 11.25L4.15 4.2C4.3 3.86667 4.55 3.58333 4.9 3.35C5.25 3.11667 5.61667 3 6 3H17V16L10 23L8.75 21.75C8.63333 21.6333 8.53767 21.475 8.463 21.275C8.38767 21.075 8.35 20.8833 8.35 20.7V20.35L9.45 16H3ZM15 5H6L3 12V14H12L10.65 19.5L15 15.15V5ZM17 16V14H20V5H17V3H22V16H17Z\" fill=\"currentColor\"/>","thumb-up-like":"<path d=\"M18 21H7V8L14 1L15.25 2.25C15.3667 2.36667 15.4627 2.525 15.538 2.725C15.6127 2.925 15.65 3.11667 15.65 3.3V3.65L14.55 8H21C21.5333 8 22 8.2 22.4 8.6C22.8 9 23 9.46667 23 10V12C23 12.1167 22.9833 12.2417 22.95 12.375C22.9167 12.5083 22.8833 12.6333 22.85 12.75L19.85 19.8C19.7 20.1333 19.45 20.4167 19.1 20.65C18.75 20.8833 18.3833 21 18 21ZM9 19H18L21 12V10H12L13.35 4.5L9 8.85V19ZM7 8V10H4V19H7V21H2V8H7Z\" fill=\"currentColor\"/>","trash-delete":"<path d=\"M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.196 20.021 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8043 20.021 18.413 20.413C18.021 20.8043 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z\" fill=\"currentColor\"/>","triple-check":"<path d=\"M4.76123 19.6785L1.94031 16.9704L1 17.8731L4.76123 21.4839L12.821 13.7465L11.8807 12.8438L4.76123 19.6785Z\" fill=\"#219EC4\"/> <path d=\"M10.7612 10.0785L7.94031 7.37038L7 8.27308L10.7612 11.8839L18.821 4.14647L17.8807 3.24377L10.7612 10.0785Z\" fill=\"#219EC4\"/> <path d=\"M14.3628 19.6785L11.5419 16.9704L10.6016 17.8731L14.3628 21.4839L22.4226 13.7465L21.4823 12.8438L14.3628 19.6785Z\" fill=\"#219EC4\"/>","trophy":"<path d=\"M7 21V19H11V15.9C10.1833 15.7167 9.45417 15.3708 8.8125 14.8625C8.17083 14.3542 7.7 13.7167 7.4 12.95C6.15 12.8 5.10417 12.2542 4.2625 11.3125C3.42083 10.3708 3 9.26667 3 8V7C3 6.45 3.19583 5.97917 3.5875 5.5875C3.97917 5.19583 4.45 5 5 5H7V3H17V5H19C19.55 5 20.0208 5.19583 20.4125 5.5875C20.8042 5.97917 21 6.45 21 7V8C21 9.26667 20.5792 10.3708 19.7375 11.3125C18.8958 12.2542 17.85 12.8 16.6 12.95C16.3 13.7167 15.8292 14.3542 15.1875 14.8625C14.5458 15.3708 13.8167 15.7167 13 15.9V19H17V21H7ZM7 10.8V7H5V8C5 8.63333 5.18333 9.20417 5.55 9.7125C5.91667 10.2208 6.4 10.5833 7 10.8ZM12 14C12.8333 14 13.5417 13.7083 14.125 13.125C14.7083 12.5417 15 11.8333 15 11V5H9V11C9 11.8333 9.29167 12.5417 9.875 13.125C10.4583 13.7083 11.1667 14 12 14ZM17 10.8C17.6 10.5833 18.0833 10.2208 18.45 9.7125C18.8167 9.20417 19 8.63333 19 8V7H17V10.8Z\" fill=\"currentColor\"/>","undo":"<path d=\"M12.5 8C9.85 8 7.45 8.99 5.6 10.6L2 7V16H11L7.38 12.38C8.77 11.22 10.54 10.5 12.5 10.5C16.04 10.5 19.05 12.81 20.1 16L22.47 15.22C21.08 11.03 17.15 8 12.5 8Z\" fill=\"currentColor\"/>","unpaid":"<path d=\"M2.99999 4.89998V4.94998L3.04999 4.93998L4.10999 5.99998H2.99999V18H16.11L20.84 22.73L22.11 21.46L4.56999 3.90998L2.38999 1.72998L1.10999 2.99998L2.99999 4.89998ZM6.40999 9.40998C6.60998 9.21998 6.75999 8.99998 6.85999 8.74998L9.15999 11.05C9.04999 11.35 8.99999 11.67 8.99999 12C8.99999 12.8 9.31999 13.56 9.87999 14.12C10.44 14.68 11.2 15 12 15C12.33 15 12.65 14.95 12.95 14.84L14.11 16H6.99999C6.99999 15.47 6.78999 14.96 6.40999 14.59C6.03999 14.21 5.52999 14 4.99999 14V9.99998C5.52999 9.99998 6.03999 9.78998 6.40999 9.40998ZM17.69 14.5L21 17.8V5.99998H9.19999L11.2 7.99998H17C17 8.52998 17.21 9.03998 17.59 9.40998C17.96 9.78998 18.47 9.99998 19 9.99998V14C18.5 14 18.05 14.18 17.69 14.5Z\" fill=\"currentColor\"/>","update":"<path d=\"M10 11H7.101L7.102 10.991C7.23257 10.3516 7.48813 9.74434 7.854 9.20399C8.39845 8.4018 9.16215 7.77315 10.054 7.39299C10.356 7.26499 10.671 7.16699 10.992 7.10199C11.6579 6.96698 12.3441 6.96698 13.01 7.10199C13.967 7.29808 14.8451 7.7714 15.535 8.46299L16.951 7.05099C16.3128 6.41262 15.5578 5.90303 14.727 5.54999C14.3033 5.37062 13.8628 5.23394 13.412 5.14199C12.4818 4.953 11.5232 4.953 10.593 5.14199C10.1419 5.23432 9.70101 5.37133 9.277 5.55099C8.02753 6.08109 6.95793 6.96108 6.197 8.08499C5.68489 8.84284 5.32676 9.69398 5.143 10.59C5.115 10.725 5.1 10.863 5.08 11H2L6 15L10 11ZM14 13H16.899L16.898 13.008C16.6367 14.2897 15.8812 15.4171 14.795 16.146C14.2548 16.5122 13.6475 16.7677 13.008 16.898C12.3424 17.033 11.6566 17.033 10.991 16.898C10.3516 16.7674 9.74435 16.5119 9.204 16.146C8.93862 15.9665 8.69085 15.7622 8.464 15.536L7.05 16.95C7.68851 17.5882 8.44392 18.0974 9.275 18.45C9.699 18.63 10.142 18.767 10.59 18.858C11.5198 19.0471 12.4782 19.0471 13.408 18.858C15.2005 18.4859 16.7773 17.4294 17.803 15.913C18.3146 15.1557 18.6724 14.3053 18.856 13.41C18.883 13.275 18.899 13.137 18.919 13H22L18 8.99999L14 13Z\" fill=\"currentColor\"/>","video-chat":"<path d=\"M15 8V16H5V8H15ZM16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5V7C17 6.45 16.55 6 16 6Z\" fill=\"currentColor\"/>","video":"<path d=\"M3 6H21V11H23V6C23 4.9 22.1 4 21 4H3C1.9 4 1 4.9 1 6V18C1 19.1 1.9 20 3 20H12V18H3V6Z\" fill=\"currentColor\"/> <path d=\"M21 18L3 18L3.00002 13H1.00002L1 18C1 19.1 1.9 20 3 20L21 20C22.1 20 23 19.1 23 18L23 6C23 4.9 22.1 4 21 4L12 4.00001V6.00001L21 6L21 18Z\" fill=\"currentColor\"/> <path d=\"M16 12L10 8V16L16 12Z\" fill=\"currentColor\"/>","view":"<path d=\"M12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9ZM12 4.5C17 4.5 21.27 7.61 23 12C21.27 16.39 17 19.5 12 19.5C7 19.5 2.73 16.39 1 12C2.73 7.61 7 4.5 12 4.5ZM3.18 12C3.98825 13.6503 5.24331 15.0407 6.80248 16.0133C8.36165 16.9858 10.1624 17.5013 12 17.5013C13.8376 17.5013 15.6383 16.9858 17.1975 16.0133C18.7567 15.0407 20.0117 13.6503 20.82 12C20.0117 10.3497 18.7567 8.95925 17.1975 7.98675C15.6383 7.01424 13.8376 6.49868 12 6.49868C10.1624 6.49868 8.36165 7.01424 6.80248 7.98675C5.24331 8.95925 3.98825 10.3497 3.18 12Z\" fill=\"currentColor\"/>","wait":"<path d=\"M6 2V8H6.01L6 8.01L10 12L6 16L6.01 16.01H6V22H18V16.01H17.99L18 16L14 12L18 8.01L17.99 8H18V2H6ZM16 16.5V20H8V16.5L12 12.5L16 16.5ZM12 11.5L8 7.5V4H16V7.5L12 11.5Z\" fill=\"currentColor\"/>","water-cup":"<path d=\"M11.1 9C10.1833 9 9.28333 9.12917 8.4 9.3875C7.51667 9.64583 6.7 10.0333 5.95 10.55L7 20H17L18.1 10H17.425C16.7917 10 16.2125 9.95417 15.6875 9.8625C15.1625 9.77083 14.45 9.59167 13.55 9.325C13.1667 9.20833 12.7667 9.125 12.35 9.075C11.9333 9.025 11.5167 9 11.1 9ZM5.7 8.375C6.55 7.925 7.42917 7.58333 8.3375 7.35C9.24583 7.11667 10.175 7 11.125 7C11.625 7 12.1208 7.03333 12.6125 7.1C13.1042 7.16667 13.5917 7.26667 14.075 7.4C14.9083 7.63333 15.5458 7.79167 15.9875 7.875C16.4292 7.95833 16.9 8 17.4 8H18.325L18.75 4H5.225L5.7 8.375ZM7 22C6.48333 22 6.03333 21.8333 5.65 21.5C5.26667 21.1667 5.05 20.7417 5 20.225L3 2H21L19 20.225C18.95 20.7417 18.7333 21.1667 18.35 21.5C17.9667 21.8333 17.5167 22 17 22H7ZM11.1 20H17H7H11.1Z\" fill=\"currentColor\"/>","water":"<path d=\"M12 2C6.67 6.55 4 10.48 4 13.8C4 18.78 7.8 22 12 22C16.2 22 20 18.78 20 13.8C20 10.48 17.33 6.55 12 2ZM12 20C8.65 20 6 17.43 6 13.8C6 11.46 7.95 8.36 12 4.66C16.05 8.36 18 11.45 18 13.8C18 17.43 15.35 20 12 20ZM7.83 14C8.2 14 8.5 14.26 8.57 14.62C8.98 16.84 10.85 17.6 12.21 17.49C12.64 17.47 13 17.81 13 18.24C13 18.64 12.68 18.97 12.28 18.99C10.15 19.12 7.66 17.9 7.09 14.87C7.01 14.42 7.37 14 7.83 14Z\" fill=\"currentColor\"/>","wearables":"<path d=\"M9 22L7.65 17.45C6.85 16.8167 6.20833 16.025 5.725 15.075C5.24167 14.125 5 13.1 5 12C5 10.9 5.24167 9.875 5.725 8.925C6.20833 7.975 6.85 7.18333 7.65 6.55L9 2H15L16.35 6.55C17.15 7.18333 17.7917 7.975 18.275 8.925C18.7583 9.875 19 10.9 19 12C19 13.1 18.7583 14.125 18.275 15.075C17.7917 16.025 17.15 16.8167 16.35 17.45L15 22H9ZM12 17C13.3833 17 14.5627 16.5123 15.538 15.537C16.5127 14.5623 17 13.3833 17 12C17 10.6167 16.5127 9.43733 15.538 8.462C14.5627 7.48733 13.3833 7 12 7C10.6167 7 9.43767 7.48733 8.463 8.462C7.48767 9.43733 7 10.6167 7 12C7 13.3833 7.48767 14.5623 8.463 15.537C9.43767 16.5123 10.6167 17 12 17ZM10.1 5.25C10.75 5.06667 11.3833 4.975 12 4.975C12.6167 4.975 13.25 5.06667 13.9 5.25L13.5 4H10.5L10.1 5.25ZM10.5 20H13.5L13.9 18.75C13.25 18.9333 12.6167 19.025 12 19.025C11.3833 19.025 10.75 18.9333 10.1 18.75L10.5 20ZM10.5 20H10.1H13.9H13.5H10.5Z\" fill=\"currentColor\"/>","widget-add":"<path d=\"M11 11V2H2V11M11 22.5V13.5H2V22.5M22 11V2H13V11M4 9V4H9V9M4 20.5V15.5H9V20.5M15 9V4H20V9M19 17V14H17V17H14V19H17V22H19V19H22V17H19Z\" fill=\"currentColor\"/>","text":"<g clip-path=\"url(#text__clip0_10372_26613)\"> <path d=\"M21.5999 3.59998V5.99998H2.3999V3.59998H21.5999ZM14.3999 8.39998V10.8H2.3999V8.39998H14.3999ZM21.5999 8.39998V10.8H16.7999V8.39998H21.5999ZM9.5999 13.2V15.6H2.3999V13.2H9.5999ZM21.5999 13.2V15.6H11.9999V13.2H21.5999ZM16.7999 18V20.4H2.3999V18H16.7999Z\" fill=\"currentColor\"/> </g> <defs> <clipPath id=\"text__clip0_10372_26613\"> <rect width=\"24\" height=\"24\" fill=\"white\"/> </clipPath> </defs>","recent-activity":"<path d=\"M4 20V17.2C4 16.6333 4.146 16.1127 4.438 15.638C4.73 15.1633 5.11733 14.8007 5.6 14.55C6.63333 14.0333 7.68333 13.646 8.75 13.388C9.81667 13.13 10.9 13.0007 12 13C12.3333 13 12.6667 13.0127 13 13.038C13.3333 13.0633 13.6667 13.1007 14 13.15V15.175C13.6667 15.1083 13.3333 15.0627 13 15.038C12.6667 15.0133 12.3333 15.0007 12 15C11.0667 15 10.1417 15.1127 9.225 15.338C8.30833 15.5633 7.4 15.9007 6.5 16.35C6.35 16.4333 6.229 16.55 6.137 16.7C6.045 16.85 5.99933 17.0167 6 17.2V18H14V20H4ZM12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM12 10C12.55 10 13.021 9.80433 13.413 9.413C13.805 9.02167 14.0007 8.55067 14 8C13.9993 7.44933 13.8037 6.97867 13.413 6.588C13.0223 6.19733 12.5513 6.00133 12 6C11.4487 5.99867 10.978 6.19467 10.588 6.588C10.198 6.98133 10.002 7.452 10 8C9.998 8.548 10.194 9.019 10.588 9.413C10.982 9.807 11.4527 10.0027 12 10ZM18 24V19H16V13H22L20 17H22L18 24Z\" fill=\"currentColor\"/>"};
  function ico(name, size, cls) {
    var inner = ICON_LIB[name];
    if (!inner) { console.warn('missing icon: ' + name); return ''; }
    var px = size || 20;
    return '<svg' + (cls ? ' class="' + cls + '"' : '') + ' viewBox="0 0 24 24" width="' + px + '" height="' + px + '" fill="none">' + inner + '</svg>';
  }

  var DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var MEALS = [
    { name: 'Breakfast', icon: 'breakfast' },
    { name: 'Snack', icon: 'snack' },
    { name: 'Lunch', icon: 'lunch' },
    { name: 'Dinner', icon: 'dinner' },
    { name: 'Snack', icon: 'snack' }
  ];
  var ICONS = {
    breakfast: ico('breakfast', 20),
    lunch: ico('lunch', 20),
    /* the library has no dinner or snack icon yet, so these are the nearest fits */
    dinner: ico('food', 20),
    snack: ico('grocery', 20),
    add: ico('add', 24)
  };

  function clearCellSelection() {
    Object.keys(cellEls).forEach(function (k) { cellEls[k].classList.remove('selected'); });
  }
  (function stickyShadow() {
    var scroller = document.querySelector('.planner-scroll');
    if (!scroller) return;
    var sync = function () { scroller.classList.toggle('scrolled', scroller.scrollLeft > 0); };
    scroller.addEventListener('scroll', sync, { passive: true });
    sync();
  })();

  var cellItems = {};   /* dayIdx|rowIdx -> [{recipeId, dish, servings, portions, leftover}] */
  var cellEls = {};
  var dayEls = {};
  function cellKey(day, row) { return day + '|' + row; }
  function redrawGrid() {
    DAYS.forEach(function (day) {
      MEALS.forEach(function (meal, ri) { renderCell(day, ri); });
      updateDayTotals(day);
    });
  }

  (function buildPlanner() {
    var planner = document.getElementById('planner');
    var header = document.createElement('div');
    header.className = 'planner-row';
    var corner = document.createElement('div');
    corner.className = 'corner-cell';
    header.appendChild(corner);
    DAYS.forEach(function (day) {
      var cell = document.createElement('div');
      cell.className = 'day-header clickable';
      cell.setAttribute('role', 'button');
      cell.setAttribute('tabindex', '0');
      cell.setAttribute('aria-label', day + ' nutrition details');
      cell.innerHTML =
        '<span class="day">' + day + '</span>' +
        '<span class="kcal">0 kcal</span>' +
        '<div class="progress"></div>';
      dayEls[day] = { kcal: cell.querySelector('.kcal'), bar: cell.querySelector('.progress'), el: cell };
      cell.addEventListener('click', function () { openNutriRail(day); });
      cell.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openNutriRail(day); }
      });
      header.appendChild(cell);
    });
    planner.appendChild(header);

    MEALS.forEach(function (meal, rowIdx) {
      var row = document.createElement('div');
      row.className = 'planner-row';
      var rh = document.createElement('div');
      rh.className = 'row-header';
      rh.innerHTML = '<span class="meal-label">' + ICONS[meal.icon] + meal.name + '</span>';
      row.appendChild(rh);
      DAYS.forEach(function (day) {
        var cell = document.createElement('button');
        cell.className = 'meal-cell';
        cell.setAttribute('aria-label', 'Add ' + meal.name.toLowerCase() + ' for ' + day);
        cell.innerHTML = ICONS.add + '<span class="add-label">Add</span>';
        cellEls[cellKey(day, rowIdx)] = cell;
        cell.addEventListener('click', function () { onCellClick(day, rowIdx); });
        row.appendChild(cell);
      });
      planner.appendChild(row);
    });
  })();

  /* ===== Panel ===== */
  document.getElementById('editPrefsLink').addEventListener('click', openDetailsPanel);
  document.getElementById('renameBtn').addEventListener('click', function () {
    openDetailsPanel();
    titleInput.focus();
    titleInput.select();
  });
  document.getElementById('closePanelBtn').addEventListener('click', function () {
    guardExit(function () { setPanelVisible(false); });
  });
  titleInput.addEventListener('input', function () {
    var v = titleInput.value || 'Untitled meal plan';
    planTitle.textContent = v;
    var plan = plans.find(function (p) { return p.id === activePlanId; });
    if (plan) plan.title = titleInput.value || 'Untitled meal plan';
    updateSaveButton();
  });

  var KCAL = { carbs: 4, fat: 9, protein: 4 };
  var PRESETS = {
    balanced:    { carbs: 0.40, fat: 0.30, protein: 0.30 },
    highprotein: { carbs: 0.30, fat: 0.30, protein: 0.40 },
    lowcarb:     { carbs: 0.20, fat: 0.50, protein: 0.30 }
  };
  var state = { preset: 'balanced', calories: 2000, grams: { carbs: 200, fat: 67, protein: 150 } };

  var caloriesInput = document.getElementById('caloriesInput');
  var macroInputs = { carbs: document.getElementById('carbsInput'), fat: document.getElementById('fatInput'), protein: document.getElementById('proteinInput') };
  var macroLabels = { carbs: document.getElementById('carbsLabel'), fat: document.getElementById('fatLabel'), protein: document.getElementById('proteinLabel') };

  function parseNum(str) { var n = parseFloat(String(str).replace(/,/g, '')); return isNaN(n) ? 0 : n; }
  function fmt(n) { return Math.round(n).toLocaleString('en-US'); }
  function pctToGrams(m, pct) { return (pct / 100) * state.calories / KCAL[m]; }

  function renderMacros() {
    ['carbs', 'fat', 'protein'].forEach(function (m) {
      macroLabels[m].textContent = m.charAt(0).toUpperCase() + m.slice(1) + ' (g)';
      macroInputs[m].value = fmt(state.grams[m]);
    });
  }
  function applyPreset(key) {
    state.preset = key;
    document.querySelectorAll('#presetChips .chip').forEach(function (c) {
      c.classList.toggle('selected', c.dataset.preset === key);
    });
    if (PRESETS[key]) {
      var r = PRESETS[key];
      state.grams = { carbs: pctToGrams('carbs', r.carbs * 100), fat: pctToGrams('fat', r.fat * 100), protein: pctToGrams('protein', r.protein * 100) };
      renderMacros();
    }
  }
  document.querySelectorAll('#presetChips .chip').forEach(function (chip) {
    chip.addEventListener('click', function () { applyPreset(chip.dataset.preset); updateSaveButton(); });
  });

  function applyCustomSilently() {
    state.preset = 'custom';
    document.querySelectorAll('#presetChips .chip').forEach(function (c) {
      c.classList.toggle('selected', c.dataset.preset === 'custom');
    });
  }
  Object.keys(macroInputs).forEach(function (m) {
    macroInputs[m].addEventListener('input', function () {
      var v = parseNum(macroInputs[m].value);
      state.grams[m] = v;
      if (state.preset !== 'custom') applyCustomSilently();
      updateSaveButton();
    });
    macroInputs[m].addEventListener('blur', renderMacros);
  });
  caloriesInput.addEventListener('input', function () {
    state.calories = parseNum(caloriesInput.value);
    if (PRESETS[state.preset]) applyPreset(state.preset);
  });
  caloriesInput.addEventListener('blur', function () { caloriesInput.value = fmt(state.calories); });
  caloriesInput.addEventListener('input', updateSaveButton);

  var targetToggle = document.getElementById('targetToggle');
  var targetBody = document.getElementById('targetBody');
  var targetOffMeta = document.getElementById('targetOffMeta');
  targetToggle.addEventListener('click', function () {
    var on = targetToggle.classList.toggle('on');
    targetToggle.setAttribute('aria-checked', on);
    targetBody.style.display = on ? 'flex' : 'none';
    targetOffMeta.classList.toggle('hidden', on);
    updateSaveButton();
  });

  /* ===== Sync with journal targets =====
     Synced means the journal is the source of truth, so the fields are locked.
     Unsynced means this meal plan owns its own numbers and they're editable. */
  var JOURNAL_TARGET = {
    calories: 1800, preset: 'balanced',
    grams: { carbs: 180, fat: 60, protein: 135 },
    updated: '12 Mar'
  };
  var syncState = true;

  function applyJournalTarget() {
    state.calories = JOURNAL_TARGET.calories;
    state.preset = JOURNAL_TARGET.preset;
    state.grams = {
      carbs: JOURNAL_TARGET.grams.carbs,
      fat: JOURNAL_TARGET.grams.fat,
      protein: JOURNAL_TARGET.grams.protein
    };
    caloriesInput.value = fmt(state.calories);
    document.querySelectorAll('#presetChips .chip').forEach(function (c) {
      c.classList.toggle('selected', c.dataset.preset === state.preset);
    });
    renderMacros();
  }

  function renderSyncState() {
    /* Synced means the journal owns these numbers, so lock the fields and hide presets */
    targetBody.classList.toggle('locked', syncState);
    caloriesInput.disabled = syncState;
    Object.keys(macroInputs).forEach(function (m) { macroInputs[m].disabled = syncState; });
    document.getElementById('presetChips').classList.toggle('hidden', syncState);

    document.getElementById('syncChecked').style.display = syncState ? 'block' : 'none';
    document.getElementById('syncUnchecked').style.display = syncState ? 'none' : 'block';
    document.getElementById('syncCheckbox').setAttribute('aria-checked', syncState);
    var title = document.getElementById('syncTitle');
    title.style.color = syncState ? 'var(--action)' : 'var(--n800)';
    title.style.fontWeight = syncState ? '600' : '500';
  }

  document.getElementById('syncRow').addEventListener('click', function () {
    syncState = !syncState;
    if (syncState) applyJournalTarget();   /* re-syncing discards custom targets */
    renderSyncState();
    updateSaveButton();
  });

  applyJournalTarget();
  renderSyncState();

  var SLASH = ico('danger-alt', 16);

  function buildChips(containerId, items, opts) {
    var container = document.getElementById(containerId);
    items.forEach(function (item) {
      var chip = document.createElement('button');
      chip.className = 'chip' + (item.extra ? ' hidden extra' : '');
      chip.dataset.value = item.label;
      chip.innerHTML = (opts.icon === 'slash' ? SLASH : '') + item.label;
      chip.addEventListener('click', function () {
        chip.classList.toggle('selected');
        updateSaveButton();
      });
      container.appendChild(chip);
    });
    if (opts.more) {
      var more = document.createElement('button');
      more.className = 'more-link';
      more.textContent = 'More';
      more.addEventListener('click', function () {
        var extras = container.querySelectorAll('.extra');
        var showing = !extras[0].classList.contains('hidden');
        extras.forEach(function (e) { e.classList.toggle('hidden', showing); });
        more.textContent = showing ? 'More' : 'Less';
      });
      container.appendChild(more);
    }
  }

  buildChips('dietaryChips', [
    { label: 'Ketogenic' }, { label: 'Kosher' }, { label: 'Low fodmap' },
    { label: 'Low glycemic' }, { label: 'Mediterranean' }, { label: 'Paleo' },
    { label: 'Vegan' }, { label: 'Vegetarian' },
    { label: 'Pescatarian', extra: true }, { label: 'Whole30', extra: true }, { label: 'Dash', extra: true }
  ], { icon: 'check', more: true });

  /* ===== Exclusions: shared state + find-ingredients rail ===== */
  var EXCL_ING = ["Acai Powder", "Ackee", "Acorn Squash", "Activated Charcoal Powder", "Adobo Seasoning", "Ahi Tuna", "Alfalfa Sprouts", "All Natural Peanut Butter", "All Purpose Gluten-Free Flour", "Almond Butter", "Almond Extract", "Almond Flour", "Almonds", "Amaranth", "Amchar Masala", "Anchovy", "Anchovy Paste", "Apple", "Apple Chips", "Apple Cider", "Apple Cider Vinegar", "Apricot", "Apricot Jam", "Arborio Rice", "Arrowroot Powder", "Artichoke", "Artichoke Hearts", "Arugula", "Asparagus", "Assorted Olives", "Avocado", "Avocado Oil", "Avocado Oil Spray", "Baba Ganoush", "Baby Carrots", "Baby Kale", "Baby Pickles", "Baby Spinach", "Bacon", "Bacon, Cooked", "Bagel", "Baking Powder", "Baking Soda", "Balsamic Glaze", "Balsamic Vinaigrette", "Balsamic Vinegar", "Bamboo Shoots", "Banana", "Barbecue Sauce", "Barbecue Skewers", "Basil Leaves", "Basmati Rice", "Basmati Rice, Cooked", "Bay Leaf", "Bean Sprouts", "Bee Pollen", "Beef Bones", "Beef Brisket", "Beef Broth", "Beef Heart", "Beef Jerky", "Beef Liver", "Beef Ravioli", "Beef Shanks", "Beef Short Ribs, Bone-In", "Beef Stick", "Beef Tenderloin", "Beef Tortellini", "Beet", "Berbere Spice", "Biryani Masala", "Bison Steak", "Black Beans", "Black Eyed Peas", "Black Olives", "Black Pepper", "Black Peppercorns", "Black Rice", "Black Salt", "Black Tea", "Black Tea Leaves", "Blackberries", "Blackstrap Molasses", "Blanched Almonds", "Blood Orange", "Blue Cheese", "Blueberries", "Blueberry Jam", "Bok Choy", "Bone Broth", "Boston Lettuce", "Brazil Nuts", "Bread", "Bread Crumbs", "Brie Cheese", "Broccoli", "Broccoli Slaw", "Broccoli Sprouts", "Broccolini", "Brown Basmati Rice", "Brown Rice", "Brown Rice Cake", "Brown Rice Fettuccine", "Brown Rice Flour", "Brown Rice Fusilli", "Brown Rice Fusilli, Cooked", "Brown Rice Lasagna Sheets", "Brown Rice Macaroni", "Brown Rice Pasta Shells", "Brown Rice Penne", "Brown Rice Spaghetti", "Brown Rice Tortilla", "Brown Rice Vermicelli Noodles", "Brown Sugar", "Brussels Sprouts", "Buckwheat Flour", "Buckwheat Groats", "Buckwheat Soba Noodles", "Bulgur", "Burrata", "Butter", "Buttermilk", "Butternut Squash", "Cacao Nibs", "Cacao Powder", "Caesar Dressing", "Cajun Seasoning", "Cajun Smoked Andouille Sausage", "Cajun Spice", "Calabash Squash", "Calamari", "Callaloo", "Calrose Rice", "Candied Ginger", "Cane Sugar", "Canned Beets", "Canned Clams", "Canned Coconut Milk", "Canned Jackfruit", "Canned Mackerel", "Canned Peaches", "Canned Whole Tomatoes", "Canned Wild Salmon", "Cannellini Beans", "Cannelloni Shells", "Cantaloupe", "Capers", "Cardamom", "Cardamom Seeds", "Carob Powder", "Carrot", "Cashew Butter", "Cashew Cream Cheese", "Cashews", "Cassava Flour", "Cauliflower", "Cauliflower Pizza Crust", "Cauliflower Rice", "Cavatappi Pasta", "Cayenne Pepper", "Cedar Plank", "Celery", "Celery Root", "Celery Salt", "Celery Seed", "Chaat Masala", "Chai Tea", "Chamomile Tea", "Chana Masala Spice Blend", "Cheddar Cheese", "Cheese Curds", "Cheese Ravioli", "Cheese Tortellini", "Cherries", "Cherry Tomatoes", "Chestnuts", "Chestnuts, In Shell", "Chia Seeds", "Chicken Breast", "Chicken Breast, Cooked", "Chicken Broth", "Chicken Broth, Low Sodium", "Chicken Drumsticks", "Chicken Heart", "Chicken Hot Dog", "Chicken Leg, Bone-in", "Chicken Leg, Boneless with Skin", "Chicken Liver", "Chicken Sausage", "Chicken Thighs", "Chicken Thighs with Skin", "Chicken Wings", "Chickpea Flour", "Chickpea Pasta", "Chickpeas", "Chili Flakes", "Chili Powder", "Chinese Broccoli", "Chinese Cooking Wine", "Chinese Five Spice", "Chipotle Powder", "Chives", "Chocolate Milk, Low Fat", "Chocolate Protein Powder", "Chorizo", "Chow Mein Noodles", "Chuck Roast", "Cilantro", "Cilantro Lime Dressing", "Cinnamon", "Cinnamon Stick", "Clams", "Clean Trail Mix", "Clementines", "Club Soda", "Cocoa Powder", "Coconut Aminos", "Coconut Butter", "Coconut Cream", "Coconut Flour", "Coconut Ice Cream", "Coconut Meat", "Coconut Oil", "Coconut Sugar", "Coconut Water", "Coconut Whipped Cream", "Cod Fillet", "Coffee", "Coleslaw Mix", "Collagen Powder", "Collard Greens", "Coriander", "Coriander Seed", "Corn", "Corn Flour", "Corn on the Cob", "Corn Tortilla", "Corn Tortilla Chips", "Corned Beef", "Cornish Hen", "Cornmeal", "Cornstarch", "Cotija Cheese", "Cottage Cheese", "Couscous", "Cow's Milk, Reduced Fat", "Cow's Milk, Whole", "Cranberry Juice", "Cranberry Sauce", "Cream Cheese, Regular", "Cream, Half & Half", "Creamed Corn", "Cremini Mushrooms", "Creole Seasoning", "Croissant", "Crushed Pineapple", "Crushed Tomatoes", "Cucumber", "Culantro", "Cumin", "Cumin Seed", "Curry Powder", "Daikon", "Dandelion Greens", "Dark Chocolate", "Dark Chocolate Chips", "Deli Roast Beef", "Delicata Squash", "Diced Tomatoes", "Digestive Biscuit", "Dijon Mustard", "Dragon Fruit", "Dried Apricots", "Dried Basil", "Dried Chamomile Flowers", "Dried Chives", "Dried Dill", "Dried Fig", "Dried Green Peas", "Dried Guajillo Chilis", "Dried Lavender Flowers", "Dried Marjoram", "Dried Mint", "Dried Onion Flakes", "Dried Parsley", "Dried Peppermint Leaves", "Dried Pomegranate Seeds", "Dried Rosemary", "Dried Thyme", "Dried Unsweetened Cranberries", "Dried Unsweetened Mango", "Dry Black Beans", "Dry Black Eyed Peas", "Dry Chickpeas", "Dry Green Lentils", "Dry Lentils", "Dry Red Lentils", "Dry Sherry", "Dry White Navy Beans", "Dry Yellow Lentils", "Dulse", "Dumpling Wrappers", "Earl Grey Tea", "Edamame Pods", "Eddo", "Egg", "Egg Noodles", "Egg Whites", "Egg Yolk", "Eggplant", "Enchilada Sauce", "Endive", "English Muffin", "Everything Bagel Seasoning", "Extra Lean Ground Beef", "Extra Lean Ground Chicken", "Extra Lean Ground Turkey", "Extra Virgin Olive Oil", "Fajita Seasoning", "Fancy Molasses", "Farfalle", "Farro", "Fava Beans", "Fennel", "Fennel Seed", "Feta Cheese", "Fiddleheads", "Fig", "Fig Jam", "Fire Roasted Diced Tomatoes", "Fish Sauce", "Flank Steak", "Flat Iron Steak", "Focaccia", "Freekeh", "Freeze Dried Strawberries", "French Shallot", "Fresh Dill", "Fresh Lump Crab Meat, Cooked", "Fresh Oregano", "Fresh Peas", "Fresh Sage", "Fresh Tarragon", "Frozen Acai", "Frozen Banana", "Frozen Berries", "Frozen Blackberries", "Frozen Blueberries", "Frozen Broad Beans", "Frozen Broccoli", "Frozen Cauliflower", "Frozen Cherries", "Frozen Corn", "Frozen Cranberries", "Frozen Edamame", "Frozen Falafel", "Frozen French Fries", "Frozen Fruit Mix", "Frozen Green Beans", "Frozen Mango", "Frozen Meatballs", "Frozen Peaches", "Frozen Peas", "Frozen Pierogies", "Frozen Pineapple", "Frozen Raspberries", "Frozen Spinach", "Frozen Strawberries", "Frozen Vegetable Mix", "Garam Masala", "Garlic", "Garlic Powder", "Garlic Scapes", "Gelatin", "Ghee", "Ginger", "Gingersnap Cookies", "Gluten-Free Bagel", "Gluten-Free Bread", "Gluten-Free Bread Crumbs", "Gluten-Free Ramen Noodles", "Gluten-Free Waffle", "Goat Cheese", "Gochujang", "Goji Berries", "Golden Beet", "Goose Breast", "Graham Crackers", "Grain-Free Flax Bread", "Granola", "Grapefruit", "Grapefruit Juice", "Grapes", "Grated Carrot", "Greek Seasoning", "Green Apple", "Green Beans", "Green Bell Pepper", "Green Cabbage", "Green Chili Pepper", "Green Curry Paste", "Green Goddess Salad Dressing", "Green Lentils", "Green Lettuce", "Green Olives", "Green Onion", "Green Tea", "Green Tea Powder", "Green Tomato", "Ground Allspice", "Ground Bison", "Ground Cloves", "Ground Elk", "Ground Fenugreek", "Ground Flax Seed", "Ground Ginger", "Ground Lamb", "Ground Mustard", "Ground Sage", "Ground Sumac", "Ground Venison", "Gruyere Cheese", "Guacamole", "Habanero Pepper", "Haddock Fillet", "Halibut Fillet", "Halloumi", "Ham, Bone-in", "Hard Taco Shell", "Harissa", "Hashbrowns", "Havarti Cheese", "Hazelnuts", "Hearts of Palm", "Heirloom Carrots", "Hemp Oil", "Hemp Seeds", "Herbes de Provence", "Hibiscus Tea", "Hoisin Sauce", "Hominy", "Honey", "Honey Mustard", "Honey Mustard Dressing", "Honeydew Melon", "Honeynut Squash", "Hot Banana Pepper", "Hot Sauce", "Hummus", "Ice Cubes", "Iceberg Lettuce", "Icing Sugar", "Instant Coffee", "Instant Yeast", "Israeli Couscous", "Italian Dressing", "Italian Seasoning", "Jackfruit", "Jalapeno Pepper", "Jasmine Rice", "Jerk Marinade", "Jerk Seasoning", "Jerusalem Artichokes", "Jicama", "Jumbo Pasta Shells", "Kale Leaves", "Kashmiri Chili Powder", "Kimchi", "King Mackerel Steak", "Kiwi", "Kohlrabi", "Kombucha", "Labneh", "Lamb Loin", "Lamb Sausage", "Lamb Shank", "Lamb Shoulder Chop", "Lasagna Sheets", "Lean Beef Patty", "Lean Ground Beef", "Lean Ground Pork", "Lebanese Seven Spice Blend", "Leeks", "Lemon", "Lemon Juice", "Lemon Pepper Seasoning", "Lemon Zest", "Lemongrass", "Lentil Macaroni", "Lentils", "Light Rye Crisp Bread", "Lima Beans", "Lime", "Lime Juice", "Linguine", "Lion's Mane Powder", "Liquid Smoke", "Lite Coconut Milk", "Lo Mein Noodles", "Lotus Root", "Maca Powder", "Macadamia Nut Butter", "Macadamia Nuts", "Macaroni", "Mackerel Fillet", "Madras Curry Powder", "Mahi Mahi Fillet", "Mango", "Mango Powder", "Maple Syrup", "Marinara Sauce", "Marshmallows", "Masala Chai Spice", "Mascarpone Cheese", "Matchstick Carrots", "Matzo", "Matzo Meal", "Mayonnaise", "Mediterranean Spice Blend", "Microgreens", "Milk Chocolate Chips", "Millet", "Mini Peppers", "Mini Potatoes", "Mini Whole Wheat Pita", "Mint Leaves", "Miso Paste", "Mixed Beans", "Mixed Greens", "Mixed Nuts", "Monk Fruit Sweetener", "Monkfish Fillet", "Moose Roast", "Moroccan Spice Blend", "Mortadella", "Mozzarella Ball", "Mozzarella Cheese", "Muesli", "Muffuletta Salad", "Mulberries", "Mulberry Jam", "Mung Beans", "Mushrooms", "Mussels", "Mustard Greens", "Naan", "Napa Cabbage", "Navel Orange", "Nectarine", "Nigella Seeds", "Nori Sheets", "Nutmeg", "Nutritional Yeast", "NY Striploin Steak", "Oat Bran", "Oat Crackers", "Oat Flour", "Oat Milk", "Oats", "Okra", "Old Bay Seasoning", "Old Fashioned Grits", "Onion Powder", "Orange Bell Pepper", "Orange Extract", "Orange Juice", "Orange Zest", "Oregano", "Orzo", "Oxtail", "Oyster Mushrooms", "Oyster Sauce", "Panang Curry Paste", "Pancetta", "Paneer Cheese", "Paneer Masala", "Panko Bread Crumbs", "Papaya", "Pappardelle Pasta", "Paprika", "Parmigiano Reggiano", "Parsley", "Parsnip", "Passata", "Peach", "Peanut Sauce", "Pear", "Pearl Barley", "Pecans", "Pecorino Romano Cheese", "Peppermint Extract", "Pepperoncini Peppers", "Pepperoni", "Peri Peri Spice", "Persimmon", "Pesto", "Pho Noodles", "Phyllo Dough", "Pickerel Fillet", "Pickle", "Pickle Brine", "Pickled Banana Peppers", "Pickled Beets", "Pickled Chipotle Peppers", "Pickled Green Tomato", "Pickled Jalapeno Pepper", "Pickled Red Onions", "Pickled Turnip", "Pie Pumpkin", "Pine Nuts", "Pineapple", "Pineapple Juice", "Pinto Beans", "Pistachios", "Pistachios, In Shell", "Pita Chips", "Pitted Dates", "Pitted Kalamata Olives", "Pitted Prunes", "Pizza Dough", "Pizza Sauce", "Plain Coconut Kefir", "Plain Coconut Kefir Yogurt", "Plain Coconut Milk", "Plain Cow's Yogurt, Whole Milk", "Plain Goat Milk Yogurt", "Plain Greek Yogurt", "Plain Kefir", "Plain Rice Cake", "Plain Sheep's Milk Yogurt", "Plain Skyr", "Plantain", "Plantain Chips", "Plum", "Poblano Pepper", "Pomegranate", "Pomegranate Juice", "Pomegranate Molasses", "Pomegranate Seeds", "Pomelo", "Popcorn", "Popcorn Kernels", "Poppy Seeds", "Popsicle Sticks", "Pork Belly", "Pork Chop", "Pork Hock", "Pork Loin Roast", "Pork Ribs", "Pork Sausage", "Pork Shoulder, Boneless", "Pork Tenderloin", "Portobello Mushroom", "Portobello Mushroom Caps", "Potato Gnocchi", "Potato Starch", "Poultry Seasoning", "Prepared Horseradish", "Prepared Pie Crust", "Pretzels", "Prime Rib, Bone-In", "Probiotic Capsules", "Prosciutto", "Protein Powder", "Provolone Cheese", "Psyllium Husk Powder", "Psyllium Husks", "Puff Pastry", "Puffed Quinoa", "Pumpkin Pie Spice", "Pumpkin Seed Butter", "Pumpkin Seeds", "Pumpkin Seeds, In Shell", "Pure Aloe Juice", "Pureed Pumpkin", "Purple Cabbage", "Purple Yam", "Quick Oats", "Quince", "Quinoa", "Quinoa Flakes", "Quinoa Penne", "Radicchio", "Radishes", "Rainbow Trout Fillet", "Raisins", "Ranch Dressing", "Rapini", "Raspberries", "Raspberry Jam", "Raspberry Leaf Tea", "Raw Honey", "Raw Peanuts", "Red Bell Pepper", "Red Hot Chili Pepper", "Red Kidney Beans", "Red Onion", "Red Pepper Flakes", "Red Potato", "Red Wine Vinegar", "Refried Beans", "Reishi Powder", "Relish", "Rhubarb", "Ribeye Steak, Bone-in", "Ribeye Steak, Boneless", "Rice Crackers", "Rice Paper Wraps", "Rice Puffs Cereal", "Rice Vermicelli Noodles", "Rice Vinegar", "Ricotta Cheese", "Rigatoni", "Roasted Red Peppers", "Romaine", "Romaine Hearts", "Rose Water", "Rosemary", "Russet Potato", "Rutabaga", "Rye Bread", "Saffron", "Salami, Mild", "Salmon Burger Patty", "Salmon Fillet", "Salmon Steak", "Salsa", "Salsa Verde", "Sambal Oelek", "Sardines", "Sauerkraut", "Savoy Cabbage", "Scallops", "Schisandra Berry Powder", "Scotch Bonnet", "Sea Bass Fillet", "Sea Salt", "Sea Salt & Black Pepper", "Seed Crackers", "Seedless Watermelon", "Seitan", "Semolina", "Serrano Pepper", "Sesame Ginger Dressing", "Sesame Oil", "Sesame Seeds", "Shallot", "Shawarma Spice Blend", "Shiitake Mushrooms", "Shirataki Noodles", "Shishito Peppers", "Shrimp", "Shrimp, Cooked", "Silken Tofu", "Skirt Steak", "Sliced Almonds", "Sliced Ham", "Sliced Turkey Breast", "Slivered Almonds", "Small Bocconcini", "Smoked Herring Fillet", "Smoked Oysters", "Smoked Paprika", "Smoked Salmon", "Snap Peas", "Snow Pea Shoots", "Snow Peas", "Soda Water", "Sole Fillet", "Sorghum Flour", "Sour Cream", "Sourdough Baguette", "Sourdough Bread", "Soy Milk", "Soy Sauce", "Soy Sauce, Low Sodium", "Spaghetti Squash", "Sparkling Water", "Spelt Flour", "Spelt Tortilla", "Sprinkles", "Squash Blossoms", "Sriracha", "Star Anise", "Steak Spice Seasoning", "Steel Cut Oats", "Stevia Powder", "Stewing Beef", "Stewing Bison", "Stir Fry Vegetable Mix", "Strawberries", "Strawberry Chia Jam", "Strawberry Jam", "String Cheese", "Strip Loin Roast", "Submarine Bun", "Sugar Free Ketchup", "Sun Dried Tomato Pesto", "Sun Dried Tomatoes", "Sunflower Seed Butter", "Sunflower Seeds", "Sunflower Sprouts", "Sweet & Sour Sauce", "Sweet Chili Sauce", "Sweet Onion", "Sweet Potato", "Sweet Potato Chips", "Sweetened Condensed Milk, Low Fat", "Sweetened Dried Lemon Peel", "Swiss Chard", "Swiss Cheese", "Tabasco Sauce", "Taco Seasoning", "Tahini", "Tamari", "Tamarind Flesh", "Tamarind Paste", "Tandoori Masala", "Tapioca Flour", "Tarragon", "Tart Cherry Juice", "Tart Shells", "Tartar Sauce", "Tawook Spice Blend", "Teff Flour", "Tempeh", "Teriyaki Sauce", "Textured Vegetable Protein", "Thai Basil", "Thai Chili", "Thai Red Curry Paste", "Thyme", "Thyme Sprigs", "Tikka Masala Paste", "Tilapia Fillet", "Tofu", "Tomatillo", "Tomato", "Tomato Juice", "Tomato Paste", "Tomato Purée", "Tomato Sauce", "Toothpicks", "Top Sirloin Beef Roast", "Top Sirloin Steak", "Tulsi Tea", "Tuna", "Tuna Steak", "Turkey Bacon", "Turkey Breast", "Turkey Breast, Cooked", "Turkey Breast, Skin on", "Turkey Sausage", "Turkey Stick", "Turkey Thigh", "Turkey Thigh, Bone-in", "Turmeric", "Turnip", "Twine", "Tzatziki", "Udon Noodles", "Unbleached All Purpose Flour", "Unsweetened Almond Milk", "Unsweetened Applesauce", "Unsweetened Banana Chips", "Unsweetened Cashew Milk", "Unsweetened Coconut Flakes", "Unsweetened Coconut Yogurt", "Unsweetened Rice Milk", "Unsweetened Shredded Coconut", "Vanilla Extract", "Vanilla Protein Powder", "Veal Leg Cutlet", "Veal Shank, Bone-in", "Vegan Caesar Dressing", "Vegan Cheese Shreds", "Vegan Cream Cheese", "Vegan Mayonnaise", "Vegan Ranch Dressing", "Vegetable Broth", "Vegetable Broth, Low Sodium", "Vegetable Oil", "Veggie Burger Patty", "Venison Sausage", "Vindaloo Spice Blend", "Walnuts", "Wasabi Paste", "Wasabi Peas", "Water", "Water Chestnuts", "Watercress", "Watermelon Radish", "Whipped Cream", "Whipping Cream", "White Bread", "White Button Mushrooms", "White Chocolate Chips", "White Cooking Wine", "White Distilled Vinegar", "White Glutinous Rice", "White Hamburger Slider Buns", "White Navy Beans", "White Onion", "White Pepper", "White Pita Bread", "White Wine Vinegar", "Whole Chicken Carcass", "Whole Cloves", "Whole Duck", "Whole Flax Seeds", "Whole Grain Bread", "Whole Grain Crackers", "Whole Grain Mustard", "Whole Roasting Chicken", "Whole Rotisserie Chicken", "Whole Sea Bass", "Whole Wheat Bagel", "Whole Wheat Bun", "Whole Wheat Flatbread", "Whole Wheat Flour", "Whole Wheat Hot Dog Bun", "Whole Wheat Linguine", "Whole Wheat Penne", "Whole Wheat Pita", "Whole Wheat Rotini Pasta", "Whole Wheat Spaghetti", "Whole Wheat Tortilla", "Wild Rice", "Wonton Wrapper", "Worcestershire Sauce", "Yellow Beans", "Yellow Bell Pepper", "Yellow Curry Paste", "Yellow Mustard", "Yellow Onion", "Yellow Potato", "Yellow Split Peas", "Yerba Mate", "Yuca", "Za'atar Spice", "Zucchini"];
  var EXCL_GRP = [{"l":"Alliums","m":[4,33,48,58,62,65,69,89,125,126,127,128,131,168,171,180,181,188,201,204,208,253,275,283,310,313,318,336,355,360,363,370,371,372,394,400,401,405,422,429,439,447,448,455,460,461,474,482,510,518,562,575,593,595,606,620,649,686,696,700,702,726,727,743,746,782,784,797,802,803,804,812,817,822,826,830,833,841,842,852,853,859,874,878,879,880,882,883,902,929,932,934]},{"l":"Almonds","m":[9,10,11,12,83,529,537,755,758,842,862]},{"l":"Beans","m":[54,72,73,143,192,193,194,291,292,293,298,303,322,348,354,355,439,491,526,527,541,612,695,700,743,753,773,774,775,814,825,827,835,842,882,901]},{"l":"Beef","m":[56,57,58,59,60,61,62,63,64,65,66,67,89,127,206,229,238,266,314,331,332,360,373,478,479,511,553,569,592,660,704,705,722,754,765,787,794,842,843,844,872,873]},{"l":"Chicken","m":[178,179,180,181,182,183,184,185,186,187,188,189,190,191,239,315,346,734,842,906,913,914]},{"l":"Citrus","m":[33,84,125,208,213,390,391,422,448,455,483,484,485,486,492,493,547,564,565,566,639,686,726,727,808,822,842,859,874,878]},{"l":"Coconut","m":[137,216,217,218,219,220,221,222,223,224,225,388,497,607,621,622,623,842,866,867,869]},{"l":"Corn","m":[87,233,234,235,236,237,240,241,251,301,352,368,428,439,440,511,561,575,640,641,802,803,826,842,875]},{"l":"Dairy","m":[62,67,85,94,119,120,121,125,156,169,170,171,172,202,242,243,245,246,249,250,254,269,306,325,363,374,376,382,421,426,431,472,513,520,535,536,574,575,580,589,597,624,625,626,627,629,630,658,664,667,686,711,759,770,793,807,810,821,842,859,892,893,896,928]},{"l":"Eggs","m":[62,67,106,125,156,171,172,305,306,307,308,360,363,477,517,583,597,654,686,773,822,842,928]},{"l":"Fruit","m":[0,1,17,18,19,20,21,22,47,81,84,86,87,138,140,145,173,213,247,248,255,271,272,277,286,289,290,327,328,335,343,344,345,346,347,351,353,357,359,361,364,365,367,384,390,391,392,395,444,457,469,483,484,486,492,493,507,508,539,540,547,548,564,565,566,577,584,586,594,610,611,616,618,631,632,633,635,636,637,638,639,678,685,688,689,733,739,790,791,792,808,815,816,820,842,863,864]},{"l":"Gluten","m":[40,62,67,92,93,118,144,158,171,172,205,244,254,269,301,306,312,320,321,333,334,360,363,376,383,387,439,454,464,477,490,494,498,503,515,516,524,537,545,568,576,578,585,587,597,615,619,654,658,659,667,712,720,740,741,743,771,772,774,775,778,779,795,821,826,827,842,860,861,874,887,894,900,904,910,911,916,917,918,919,920,921,922,923,924,925,926,928]},{"l":"Grains","m":[8,13,23,40,51,52,62,67,77,92,93,99,100,101,102,103,104,105,106,107,108,109,110,111,112,115,116,117,118,132,144,158,171,172,205,233,234,235,236,237,240,241,244,251,254,269,301,306,312,320,321,333,334,352,360,363,368,376,377,378,379,380,381,383,387,389,428,439,440,454,459,464,477,490,494,498,503,511,513,515,516,521,524,537,545,554,555,556,557,558,561,568,576,578,587,596,597,615,619,628,640,641,654,658,659,667,668,677,679,680,681,706,707,708,709,712,720,723,740,741,743,769,771,772,778,779,785,789,795,821,824,826,827,842,860,861,868,875,882,887,894,899,900,904,910,911,916,917,918,919,920,921,922,923,924,925,926,927,928]},{"l":"Legumes","m":[6,7,43,54,72,73,143,192,193,194,278,291,292,293,294,295,296,298,299,303,322,340,348,354,355,358,362,383,396,402,439,448,488,489,491,526,527,541,572,585,612,692,695,700,743,753,764,766,773,774,775,814,825,826,827,835,842,874,875,877,887,901,930,936]},{"l":"Lentils","m":[294,295,296,299,402,488,489,842,882]},{"l":"Mushrooms","m":[252,495,513,542,570,652,653,701,748,842,895]},{"l":"Nightshades","m":[33,48,69,70,106,126,127,128,141,159,165,168,174,184,195,196,199,200,204,238,253,256,268,279,309,310,318,329,356,363,383,384,397,399,400,408,422,423,429,430,439,446,447,455,458,460,461,466,467,505,510,512,522,523,533,538,560,563,572,575,579,583,591,592,593,594,601,603,604,605,620,634,654,655,678,693,694,697,698,713,718,722,726,727,728,734,742,747,750,762,782,784,789,796,797,798,802,803,811,812,815,816,817,822,829,830,833,836,837,838,839,840,841,842,853,874,884,886,887,929,931,932,935]},{"l":"Nuts","m":[7,9,10,11,12,83,91,151,152,153,175,176,212,432,501,502,529,537,572,575,585,588,609,613,614,692,755,758,842,862,865,876,878,885]},{"l":"Oats","m":[389,537,554,555,556,557,558,677,785,842]},{"l":"Oils","m":[10,16,31,32,44,120,125,152,208,222,254,269,301,306,317,333,355,363,374,376,383,387,401,430,435,439,443,455,460,510,517,538,575,595,597,615,619,620,632,654,658,667,686,723,728,743,744,779,797,821,822,842,874,875,876,878,881,882,928]},{"l":"Onions","m":[48,58,69,89,126,127,128,131,168,180,181,188,201,204,253,283,310,313,318,336,360,363,400,401,405,422,429,439,447,455,460,461,474,510,562,575,593,606,620,649,686,696,700,702,726,727,746,784,804,812,817,822,826,830,833,841,842,852,859,878,879,880,882,902,929,932,934]},{"l":"Pork","m":[38,39,62,127,204,360,427,480,534,573,592,644,645,646,647,648,649,650,651,662,722,756,842]},{"l":"Processed foods","m":[3,8,10,16,23,36,38,39,40,43,44,48,51,52,60,62,65,67,82,85,92,93,94,99,101,102,104,105,106,107,108,109,110,111,112,113,117,119,125,127,132,133,134,135,138,140,141,144,146,149,152,156,158,169,170,171,172,184,188,193,198,202,203,204,205,215,220,225,229,236,237,238,242,243,245,247,249,250,251,254,255,264,265,266,269,297,301,302,306,310,312,319,320,325,329,330,333,355,356,360,363,373,376,377,378,379,380,381,382,383,387,401,421,426,427,428,430,431,439,446,447,451,452,453,459,464,472,474,477,488,490,494,496,498,503,511,513,515,516,517,520,524,526,530,534,535,536,538,545,555,564,568,571,573,574,576,578,580,585,589,591,592,596,597,600,601,602,603,604,605,606,607,611,615,619,620,628,636,637,649,654,657,658,659,662,663,664,667,677,680,681,686,700,702,706,707,708,709,711,712,720,722,723,728,738,740,743,749,753,756,757,759,760,761,763,770,771,772,773,774,775,779,780,782,793,795,796,802,803,807,810,811,814,821,822,825,826,827,835,838,842,848,852,853,860,861,868,871,874,875,876,877,881,882,883,887,892,893,894,896,897,899,900,904,910,911,916,917,918,919,920,921,922,923,924,925,926,928,929]},{"l":"Rice","m":[8,23,51,52,77,99,100,101,102,103,104,105,106,107,108,109,110,111,112,132,198,377,378,379,380,381,459,526,596,607,628,706,707,708,709,710,723,738,743,842,868,899,927]},{"l":"Seafood","m":[5,15,16,130,136,139,142,211,226,229,330,338,424,425,468,504,506,531,543,571,572,598,684,723,724,725,729,732,735,751,752,760,761,763,765,768,822,834,842,846,847,915,929]},{"l":"Soy","m":[303,354,376,383,439,526,585,743,753,773,774,775,814,825,826,827,835,842,874,877,881]},{"l":"Spicy foods","m":[4,14,69,70,126,127,128,159,165,168,195,196,199,200,204,253,261,279,310,318,383,399,400,409,411,423,429,439,446,447,458,460,461,466,467,481,505,512,533,560,572,575,591,592,593,601,603,605,657,694,697,726,727,728,734,742,782,803,811,812,817,823,829,830,833,842,884,886,887,903,907,932]},{"l":"Sugar","m":[44,48,82,87,113,133,134,202,208,220,223,251,264,265,269,319,376,383,387,439,441,442,443,451,464,509,511,520,529,537,540,549,572,576,602,603,606,607,619,622,637,658,689,691,743,769,780,789,791,792,802,803,807,821,822,826,842,874,892,896,929]},{"l":"Tomatoes","m":[48,141,174,256,268,310,329,408,429,460,510,583,604,620,726,727,796,797,798,802,833,836,837,838,839,840,841,842,879,880]},{"l":"Turkey","m":[316,541,757,842,848,849,850,851,852,853,854,855]},{"l":"Wheat","m":[40,62,92,93,118,144,158,171,172,205,244,254,269,301,306,312,320,321,333,334,360,363,376,387,439,454,464,477,490,494,498,503,515,516,524,568,576,578,597,615,619,654,658,659,667,712,720,740,741,743,771,772,774,775,778,779,795,821,826,827,842,860,861,887,894,900,904,910,911,916,917,918,919,920,921,922,923,924,925,926,928]}];

  /* Three recognisable members per group. Curated because the data can't be trusted
     to surface them automatically — sorting by name gives "Adobo Seasoning" for
     Alliums, and mistags like Toothpicks sit in seven groups. */
  var EXCL_REPS = {"Alliums": ["Red Onion", "Garlic", "Leeks"], "Almonds": ["Almonds", "Almond Flour", "Almond Butter"], "Beans": ["Black Beans", "Chickpeas", "Red Kidney Beans"], "Beef": ["Lean Ground Beef", "Flank Steak", "Beef Broth"], "Chicken": ["Chicken Breast", "Chicken Thighs", "Chicken Broth"], "Citrus": ["Lemon", "Lime", "Orange Zest"], "Coconut": ["Coconut Oil", "Coconut Flour", "Lite Coconut Milk"], "Corn": ["Corn", "Popcorn", "Cornmeal"], "Dairy": ["Cheddar Cheese", "Butter", "Plain Greek Yogurt"], "Eggs": ["Egg", "Egg Whites", "Mayonnaise"], "Fruit": ["Apple", "Banana", "Blueberries"], "Gluten": ["Bread", "Pearl Barley", "Rye Bread"], "Grains": ["Brown Rice", "Oats", "Bread"], "Legumes": ["Chickpeas", "Lentils", "Raw Peanuts"], "Lentils": ["Lentils", "Dry Red Lentils", "Green Lentils"], "Mushrooms": ["Mushrooms", "Shiitake Mushrooms", "Cremini Mushrooms"], "Nightshades": ["Tomato", "Red Bell Pepper", "Red Potato"], "Nuts": ["Almonds", "Walnuts", "Cashews"], "Oats": ["Oats", "Oat Flour", "Granola"], "Oils": ["Extra Virgin Olive Oil", "Butter", "Ghee"], "Onions": ["Red Onion", "Green Onion", "Shallot"], "Pork": ["Bacon", "Sliced Ham", "Pork Chop"], "Processed foods": ["Oat Crackers", "Pita Chips", "Hot Sauce"], "Rice": ["Brown Rice", "Basmati Rice", "Wild Rice"], "Seafood": ["Salmon Steak", "Shrimp", "Tuna"], "Soy": ["Tofu", "Tempeh", "Soy Sauce"], "Spicy foods": ["Hot Sauce", "Jalapeno Pepper", "Cayenne Pepper"], "Sugar": ["Honey", "Maple Syrup", "Brown Sugar"], "Tomatoes": ["Tomato", "Tomato Paste", "Salsa"], "Turkey": ["Turkey Breast", "Extra Lean Ground Turkey", "Turkey Bacon"], "Wheat": ["Bread", "Whole Wheat Flour", "Pita Chips"]};

  /* "Includes a, b and c" — or with a count when there's more. Anything the
     search matched is promoted into the three, so the row shows why it appeared. */
  function groupSubtitle(label, hitIdx, q) {
    var total = (EXCL_GRP.filter(function (g) { return g.l === label; })[0] || { m: [] }).m.length;
    var names = [];
    (hitIdx || []).map(function (i) { return EXCL_ING[i]; })
      .sort(function (a, b) { return matchScore(a, q) - matchScore(b, q) || a.length - b.length; })
      .forEach(function (n) { if (names.length < 3 && names.indexOf(n) === -1) names.push(n); });
    (EXCL_REPS[label] || []).forEach(function (n) {
      if (names.length < 3 && names.indexOf(n) === -1) names.push(n);
    });
    if (!names.length) return '';
    var shown = names.map(function (n) { return hi(n, q); });
    var rest = total - names.length;
    if (rest > 0) return 'Includes ' + shown.join(', ') + ' +' + rest + ' more';
    if (shown.length === 1) return 'Includes ' + shown[0];
    return 'Includes ' + shown.slice(0, -1).join(', ') + ' and ' + shown[shown.length - 1];
  }

  var EXCL_BASE = ['G:Gluten', 'G:Almonds', 'G:Beans', 'G:Dairy', 'G:Corn', 'G:Chicken', 'G:Eggs', 'G:Processed foods'];
  var EXCL_COMMON = {
    groups: ['Gluten', 'Dairy', 'Nuts', 'Eggs', 'Soy', 'Seafood', 'Corn', 'Processed foods'],
    ingredients: ['Cilantro', 'Raw Peanuts']
  };
  var ING_SHORT_CAP = 10;
  var GRP_CAP = 6;
  var exclSelected = new Set();
  var exclPending = new Set();

  var CLOSE_X = ico('close', 16);
  var CBX_ON = ico('checkbox-filled', 20);
  var CBX_OFF = ico('checkbox-unchecked', 20);

  function exclLabel(key) { return key.slice(2); }

  function renderExclusionChips() {
    var container = document.getElementById('exclusionChips');
    container.innerHTML = '';
    /* selected first, so what's in force is never buried among the suggestions */
    var selected = [], rest = [];
    EXCL_BASE.forEach(function (k) { (exclSelected.has(k) ? selected : rest).push(k); });
    exclSelected.forEach(function (k) { if (EXCL_BASE.indexOf(k) === -1) selected.push(k); });
    selected.concat(rest).forEach(function (key) {
      var chip = document.createElement('button');
      chip.className = 'chip' + (exclSelected.has(key) ? ' selected' : '');
      chip.innerHTML = SLASH + exclLabel(key);
      chip.addEventListener('click', function () {
        if (exclSelected.has(key)) exclSelected.delete(key);
        else exclSelected.add(key);
        renderExclusionChips();
        updateSaveButton();
      });
      container.appendChild(chip);
    });
    var more = document.createElement('button');
    more.className = 'more-link';
    more.textContent = 'More';
    more.addEventListener('click', openExclRail);
    container.appendChild(more);
  }
  renderExclusionChips();

  /* ===== Page header summary: preferences, then the edit link ===== */
  var IC_TARGET = ico('target', 16);
  var HDR_CHIP_CAP = 2;

  function selectedChipLabels(containerId) {
    return [].slice.call(document.querySelectorAll('#' + containerId + ' .chip.selected'))
      .map(function (c) { return c.dataset.value; });
  }

  function applyPanelMode() {
    var isDefaults = panelMode === 'defaults';
    document.getElementById('panelTitle').textContent = isDefaults ? 'Default preferences' : 'Meal plan details';
    document.getElementById('planTitleSection').classList.toggle('hidden', isDefaults);
    document.getElementById('defaultsCheckboxWrap').classList.toggle('hidden', isDefaults);
    syncResetLink();
  }

  function openDetailsPanel() {
    panelMode = 'plan';
    clearCellSelection();
    applyPanelMode();
    setPanelVisible(true);
    beginPanelEdit();
  }

  /* Opened from the Nutrition Plan page header, outside any specific meal plan */
  function openDefaultPreferencesPanel() {
    panelMode = 'defaults';
    clearCellSelection();
    document.getElementById('recipeRail').classList.add('hidden-panel');
    applyDefaultsToFields(clientDefaults || emptyDefaultFields());
    applyPanelMode();
    setPanelVisible(true);
    beginPanelEdit();
  }

  /* The header shows saved preferences only, never the panel's unsaved edits */
  var savedPrefs = { targetOn: false, calories: 0, grams: { carbs: 0, fat: 0, protein: 0 }, dietary: [], exclusions: [], cultural: [] };

  /* ===== Client-level default preferences =====
     Set once from "Set as client's defaults", then applied to every new plan. */
  var clientDefaults = null;
  var panelMode = 'plan';   /* 'plan' edits one meal plan; 'defaults' edits the client default */

  function captureFieldsAsDefaults() {
    return {
      targetOn: targetToggle.classList.contains('on'),
      calories: state.calories,
      preset: state.preset,
      grams: { carbs: state.grams.carbs, fat: state.grams.fat, protein: state.grams.protein },
      synced: syncState,
      dietary: selectedChipLabels('dietaryChips'),
      cultural: selectedChipLabels('culturalChips'),
      exclusions: setToArray(exclSelected)
    };
  }

  /* Writes a defaults object into the open panel's fields, mirroring restorePanel */
  function applyDefaultsToFields(def) {
    targetToggle.classList.toggle('on', def.targetOn);
    targetToggle.setAttribute('aria-checked', def.targetOn);
    targetBody.style.display = def.targetOn ? 'flex' : 'none';
    targetOffMeta.classList.toggle('hidden', def.targetOn);

    syncState = !!def.synced;
    renderSyncState();
    state.calories = def.calories;
    state.preset = def.preset;
    state.grams = { carbs: def.grams.carbs, fat: def.grams.fat, protein: def.grams.protein };
    caloriesInput.value = fmt(state.calories);
    document.querySelectorAll('#presetChips .chip').forEach(function (c) {
      c.classList.toggle('selected', c.dataset.preset === def.preset);
    });
    renderMacros();

    document.querySelectorAll('#dietaryChips .chip').forEach(function (c) {
      c.classList.toggle('selected', def.dietary.indexOf(c.dataset.value) !== -1);
    });
    document.querySelectorAll('#culturalChips .chip').forEach(function (c) {
      c.classList.toggle('selected', def.cultural.indexOf(c.dataset.value) !== -1);
    });
    exclSelected = new Set(def.exclusions);
    renderExclusionChips();
  }

  function emptyDefaultFields() {
    return { targetOn: false, calories: 2000, preset: 'balanced',
      grams: { carbs: 200, fat: 67, protein: 150 }, synced: true,
      dietary: [], cultural: [], exclusions: [] };
  }

  /* Recipes matching the panel's current draft, across every mealtime */
  function draftMatchCount() {
    var banned = excludedIngredientNamesFor(setToArray(exclSelected));
    var diets = selectedChipLabels('dietaryChips');
    var total = 0;
    MEALS.forEach(function (meal) {
      RECIPES.forEach(function (r) {
        if (r.mealtime.indexOf(meal.name.toLowerCase()) === -1) return;
        var det = RECIPE_DETAILS[r.id] || { diet: [], ing: [] };
        if (!diets.every(function (d) { return det.diet.indexOf(d) !== -1; })) return;
        if (banned.length && !det.ing.length) return;
        var hit = det.ing.some(function (entry) {
          var name = entry.split('|')[0].toLowerCase();
          return banned.some(function (b) { return nameMatches(name, b); });
        });
        if (!hit) total++;
      });
    });
    return total;
  }

  var PREF_WARNING_THRESHOLD = 8;
  function renderPrefWarning() {
    var box = document.getElementById('prefWarning');
    var n = draftMatchCount();
    if (n >= PREF_WARNING_THRESHOLD) { box.classList.add('hidden'); return; }
    document.getElementById('prefWarningText').textContent = n === 0
      ? 'No recipes match these preferences across any meal.'
      : 'Only ' + n + ' recipe' + (n === 1 ? '' : 's') + ' match' + (n === 1 ? 'es' : '') + ' these preferences. Consider loosening some filters.';
    box.classList.remove('hidden');
  }

  /* Reset to default: only shown when a client default exists; pulls it into the draft */
  function syncResetLink() {
    document.getElementById('resetDefaultsLink').classList.toggle('hidden', !clientDefaults);
    renderDefaultsIndicator();
  }

  document.getElementById('resetDefaultsLink').addEventListener('click', function () {
    if (!clientDefaults) return;
    applyDefaultsToFields(clientDefaults);
    updateSaveButton();
  });

  /* Shared chip renderer: builds the "kcal + preferences (+N overflow)" row
     used both by a meal plan's own header and by the Nutrition Plan page
     header (client defaults). Same visual + capping logic either way. */
  function renderPrefChips(containerId, prefsSource, onMoreClick) {
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.innerHTML = '';

    /* Calorie target only reads as a fact when the target is switched on */
    if (prefsSource.targetOn) {
      var kcal = document.createElement('span');
      kcal.className = 'tag-counter';
      kcal.innerHTML = IC_TARGET + prefsSource.calories.toLocaleString('en-US') + ' kcal';
      wrap.appendChild(kcal);
    }

    var prefs = [];
    prefsSource.dietary.forEach(function (l) { prefs.push({ label: l, excl: false }); });
    prefsSource.exclusions.forEach(function (k) { prefs.push({ label: exclLabel(k), excl: true }); });
    prefsSource.cultural.forEach(function (l) { prefs.push({ label: l, excl: false }); });

    prefs.slice(0, HDR_CHIP_CAP).forEach(function (pref) {
      var tag = document.createElement('span');
      tag.className = 'tag-counter';
      /* slash marks an exclusion, so a green chip can't be read as "includes" */
      tag.innerHTML = (pref.excl ? SLASH : '') + pref.label;
      wrap.appendChild(tag);
    });
    if (prefs.length > HDR_CHIP_CAP) {
      var more = document.createElement('button');
      more.className = 'tag-counter';
      more.textContent = '+' + (prefs.length - HDR_CHIP_CAP);
      more.setAttribute('aria-label', (prefs.length - HDR_CHIP_CAP) + ' more preferences. Edit preferences');
      more.addEventListener('click', onMoreClick);
      wrap.appendChild(more);
    }

    var hasContent = prefsSource.targetOn || prefs.length > 0;
    wrap.classList.toggle('hidden', !hasContent);
    return hasContent;
  }

  /* Visible proof, on the Nutrition Plan page itself, that a client default
     is in effect — same chip treatment as a meal plan's own header. */
  function renderDefaultsIndicator() {
    if (!clientDefaults) {
      var wrap = document.getElementById('defaultsIndicator');
      if (wrap) wrap.classList.add('hidden');
      return;
    }
    renderPrefChips('defaultsIndicator', {
      targetOn: clientDefaults.targetOn,
      calories: clientDefaults.calories,
      dietary: clientDefaults.dietary,
      exclusions: clientDefaults.exclusions,
      cultural: clientDefaults.cultural
    }, function () { guardExit(openDefaultPreferencesPanel); });
  }

  function renderHeaderTags() {
    renderPrefChips('hdrTags', savedPrefs, openDetailsPanel);
  }

  /* ===== Unsaved-changes guard =====
     Applies while editing preferences (including the exclusions sub-editor).
     Explicit discard actions (the panel's own Cancel, the exclusion rail's own
     Cancel) stay immediate \u2014 the person already chose to discard. This guard
     is for indirect exits: closing the panel, navigating away, or opening a
     different panel/surface while changes are pending. */
  var unsavedModal = document.getElementById('unsavedModal');
  var pendingExitAction = null;

  function panelIsDirty() {
    return !panel.classList.contains('hidden-panel') && panelBaseline !== null && !saveBtn.disabled;
  }
  function exclIsDirty() {
    if (!exclPanel || exclPanel.classList.contains('hidden-panel')) return false;
    var a = setToArray(exclPending).sort().join(',');
    var b = setToArray(exclSelected).sort().join(',');
    return a !== b;
  }
  function hasUnsavedChanges() { return panelIsDirty() || exclIsDirty(); }

  /* Run proceedFn now if nothing is at risk, otherwise ask first. */
  function guardExit(proceedFn) {
    if (!hasUnsavedChanges()) { proceedFn(); return; }
    pendingExitAction = proceedFn;
    unsavedModal.classList.remove('hidden');
    document.getElementById('unsavedDiscardBtn').focus();
  }
  function closeUnsavedModal() {
    unsavedModal.classList.add('hidden');
    pendingExitAction = null;
  }
  document.getElementById('unsavedKeepBtn').addEventListener('click', closeUnsavedModal);
  unsavedModal.addEventListener('click', function (e) { if (e.target === unsavedModal) closeUnsavedModal(); });
  document.getElementById('unsavedDiscardBtn').addEventListener('click', function () {
    if (exclIsDirty()) exclPending = new Set(exclSelected);        /* drop the pending exclusion edits */
    if (panelIsDirty()) restorePanel(panelBaseline);               /* drop the preferences edits */
    var run = pendingExitAction;
    unsavedModal.classList.add('hidden');
    pendingExitAction = null;
    if (run) run();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !unsavedModal.classList.contains('hidden')) closeUnsavedModal();
  });

  /* ===== Panel draft state: Save commits, Cancel reverts ===== */
  function setToArray(st) {
    var out = [];
    st.forEach(function (v) { out.push(v); });
    return out;
  }
  function snapshotPanel() {
    return JSON.stringify({
      title: titleInput.value,
      targetOn: targetToggle.classList.contains('on'),
      calories: state.calories,
      preset: state.preset,
      grams: state.grams,
      dietary: selectedChipLabels('dietaryChips'),
      cultural: selectedChipLabels('culturalChips'),
      exclusions: setToArray(exclSelected).sort(),
      synced: syncState,
      defaults: cbState
    });
  }
  var panelBaseline = null;

  function updateSaveButton() {
    if (!panelBaseline) return;
    saveBtn.disabled = snapshotPanel() === panelBaseline;
    renderPrefWarning();
  }

  function restorePanel(snapJson) {
    var snap = JSON.parse(snapJson);
    if (panelMode === 'plan') {
      titleInput.value = snap.title;
      planTitle.textContent = snap.title || 'Untitled meal plan';
      var plan = plans.find(function (pl) { return pl.id === activePlanId; });
      if (plan) plan.title = snap.title || 'Untitled meal plan';
    }

    targetToggle.classList.toggle('on', snap.targetOn);
    targetToggle.setAttribute('aria-checked', snap.targetOn);
    targetBody.style.display = snap.targetOn ? 'flex' : 'none';
    targetOffMeta.classList.toggle('hidden', snap.targetOn);

    syncState = snap.synced;
    renderSyncState();
    state.calories = snap.calories;
    state.preset = snap.preset;
    state.grams = { carbs: snap.grams.carbs, fat: snap.grams.fat, protein: snap.grams.protein };
    caloriesInput.value = fmt(state.calories);
    document.querySelectorAll('#presetChips .chip').forEach(function (c) {
      c.classList.toggle('selected', c.dataset.preset === snap.preset);
    });
    renderMacros();

    document.querySelectorAll('#dietaryChips .chip').forEach(function (c) {
      c.classList.toggle('selected', snap.dietary.indexOf(c.dataset.value) !== -1);
    });
    document.querySelectorAll('#culturalChips .chip').forEach(function (c) {
      c.classList.toggle('selected', snap.cultural.indexOf(c.dataset.value) !== -1);
    });
    exclSelected = new Set(snap.exclusions);
    renderExclusionChips();
    setCb(snap.defaults);
    renderPrefWarning();
  }

  function beginPanelEdit() {
    panelBaseline = snapshotPanel();
    updateSaveButton();
  }

  function commitPanel() {
    if (panelMode === 'defaults') {
      clientDefaults = captureFieldsAsDefaults();
      panelBaseline = snapshotPanel();
      syncResetLink();
      updateSaveButton();
      return;
    }
    savedPrefs = {
      targetOn: targetToggle.classList.contains('on'),
      calories: state.calories,
      grams: { carbs: state.grams.carbs, fat: state.grams.fat, protein: state.grams.protein },
      dietary: selectedChipLabels('dietaryChips'),
      exclusions: setToArray(exclSelected),
      cultural: selectedChipLabels('culturalChips')
    };
    renderHeaderTags();
    /* the checkbox is only present in plan mode, and IS the act of setting the default */
    if (cbState) clientDefaults = captureFieldsAsDefaults();
    panelBaseline = snapshotPanel();
    syncResetLink();
    updateSaveButton();
  }

  var editPrefsLink = document.getElementById('editPrefsLink');
  function setPanelVisible(v) {
    if (v) pushPanel(panel); else popPanel(panel);
  }

  /* ===== Panel stack: a new panel slides in over whatever is already open ===== */
  var PANEL_IN_MS = 260, PANEL_OUT_MS = 220, RAIL_MS = 180;
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var panelZ = 20;

  var aiPanel = document.getElementById('aiPanel');
  function allPanels() { return [].slice.call(document.querySelectorAll('.panel')); }
  function visiblePanels() {
    return allPanels().filter(function (p) { return !p.classList.contains('hidden-panel'); });
  }
  function syncPanelSpace() {
    document.querySelector('.content-wrapper').classList.toggle('has-panel', visiblePanels().length > 0);
  }
  function replay(el, cls) {
    el.classList.remove('panel-in', 'panel-out', 'rail-push', 'rail-pop');
    void el.offsetWidth;
    el.classList.add(cls);
  }

  function clearAnim(el) { el.classList.remove('panel-in', 'panel-out', 'rail-push', 'rail-pop'); }
  function hideNow(el) { el.classList.add('hidden-panel'); clearAnim(el); }

  /* The rail slot is one place. The frame only slides when the rail itself arrives or
     leaves; swapping which view occupies the slot is a content push, like the
     transitions inside the recipe rail. */
  function pushPanel(el) {
    /* chat and a right rail together would leave the plan too narrow to read */
    if (aiPanel && !aiPanel.classList.contains('hidden')) closeAiPanel();
    var beneath = visiblePanels().filter(function (p) { return p !== el; });
    if (!el.classList.contains('hidden-panel')) { beneath.forEach(hideNow); syncPanelSpace(); return; }

    el.style.zIndex = ++panelZ;
    el.classList.remove('hidden-panel');
    syncPanelSpace();

    if (reducedMotion) { beneath.forEach(hideNow); syncPanelSpace(); return; }

    if (beneath.length) {
      /* swapping views in the slot: content pushes in, frame stays put */
      replay(el, 'rail-push');
      setTimeout(function () {
        beneath.forEach(hideNow);
        el.classList.remove('rail-push');
        syncPanelSpace();
      }, RAIL_MS);
    } else {
      /* the rail is arriving: slide the frame in from the right */
      replay(el, 'panel-in');
      setTimeout(function () { el.classList.remove('panel-in'); }, PANEL_IN_MS);
    }
  }

  /* Going back: content pops in the other direction. Closing the last panel slides out. */
  function popPanel(el, revealEl) {
    if (el.classList.contains('hidden-panel')) {
      if (revealEl) pushPanel(revealEl);
      return;
    }
    if (revealEl) {
      revealEl.style.zIndex = ++panelZ;
      revealEl.classList.remove('hidden-panel');
      clearAnim(revealEl);
      if (reducedMotion) { hideNow(el); syncPanelSpace(); return; }
      replay(revealEl, 'rail-pop');
      setTimeout(function () {
        hideNow(el);
        revealEl.classList.remove('rail-pop');
        syncPanelSpace();
      }, RAIL_MS);
      return;
    }
    if (reducedMotion) { hideNow(el); syncPanelSpace(); return; }
    replay(el, 'panel-out');
    setTimeout(function () { hideNow(el); syncPanelSpace(); }, PANEL_OUT_MS);
  }

    var exclPanel = document.getElementById('exclPanel');
  var exclSearch = document.getElementById('exclSearch');

  function openExclRail() {
    pushPanel(exclPanel);
    exclPending = new Set(exclSelected);
    exclSearch.value = '';

    renderExclRail();
    exclSearch.focus();
  }
  function closeExclRail() {
    popPanel(exclPanel, panel);
    setPanelVisible(true);
  }

  function renderExclSelChips() {
    var wrap = document.getElementById('exclSelChips');
    wrap.innerHTML = '';
    exclPending.forEach(function (key) {
      var chip = document.createElement('span');
      chip.className = 'sel-chip';
      chip.innerHTML = SLASH + exclLabel(key) + '<button class="x-btn" aria-label="Remove ' + exclLabel(key) + '">' + CLOSE_X + '</button>';
      chip.querySelector('.x-btn').addEventListener('click', function () {
        exclPending.delete(key);
        renderExclRail();
      });
      wrap.appendChild(chip);
    });
    if (exclPending.size) {
      var clear = document.createElement('button');
      clear.className = 'more-link';
      clear.textContent = 'Clear all';
      clear.addEventListener('click', function () {
        exclPending.clear();
        renderExclRail();
      });
      wrap.appendChild(clear);
    }
  }

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function hi(name, q) {
    if (!q) return esc(name);
    var i = name.toLowerCase().indexOf(q);
    if (i === -1) return esc(name);
    return esc(name.slice(0, i)) + '<b>' + esc(name.slice(i, i + q.length)) + '</b>' + esc(name.slice(i + q.length));
  }

  /* Selecting a group already excludes every ingredient in it, so member rows
     show as covered rather than as separate choices. */
  function coveringGroups(ingName) {
    var idx = EXCL_ING.indexOf(ingName);
    if (idx === -1) return [];
    var out = [];
    EXCL_GRP.forEach(function (g) {
      if (g.m.indexOf(idx) !== -1 && exclPending.has('G:' + g.l)) out.push(g.l);
    });
    return out;
  }

  /* An individual exclusion is redundant once its group is excluded */
  function absorbIntoGroups() {
    var drop = [];
    exclPending.forEach(function (key) {
      if (key.indexOf('I:') === 0 && coveringGroups(key.slice(2)).length) drop.push(key);
    });
    drop.forEach(function (key) { exclPending.delete(key); });
    return drop.length;
  }

  function cbxRow(key, titleHtml, subHtml, lockedBy) {
    var locked = !!lockedBy;
    var on = locked || exclPending.has(key);
    var row = document.createElement('button');
    row.className = 'cbx-row' + (on ? ' checked' : '') + (locked ? ' locked' : '');
    if (locked) {
      row.setAttribute('aria-disabled', 'true');
      subHtml = 'Excluded via ' + lockedBy;
    }
    row.innerHTML =
      '<span class="cbx-icon">' + (on ? CBX_ON : CBX_OFF) + '</span>' +
      '<span class="cbx-content"><span class="cbx-title">' + titleHtml + '</span>' +
      (subHtml ? '<span class="cbx-sub">' + subHtml + '</span>' : '') +
      '</span>';
    if (!locked) {
      row.addEventListener('click', function () {
        if (exclPending.has(key)) exclPending.delete(key);
        else exclPending.add(key);
        absorbIntoGroups();
        renderExclRail();
      });
    }
    return row;
  }

  function matchScore(name, q) {
    var n = name.toLowerCase();
    var i = n.indexOf(q);
    if (i === -1) return -1;
    if (n === q) return 0;
    if (i === 0) return 1;
    if (n.charAt(i - 1) === ' ' || n.charAt(i - 1) === '-') return 2;
    return 3;
  }

  function renderExclRail() {
    renderExclSelChips();
    var body = document.getElementById('exclBody');
    body.innerHTML = '';
    var q = exclSearch.value.trim().toLowerCase();

    var groups = [];
    var ingRows = [];
    var ingNote = null;

    if (!q) {
      /* Default: empty state prompting search */
      var prompt = document.createElement('div');
      prompt.style.cssText = 'padding:32px 16px; display:flex; flex-direction:column; align-items:center; gap:8px; text-align:center;';
      prompt.innerHTML =
        '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--n500)" stroke-width="1.8" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>' +
        '<span style="font-size:12px; font-weight:400; color:var(--n700); line-height:1.5; max-width:280px;">Search to exclude specific ingredients or whole groups, like eggs or gluten. Recipes that contain them won\'t appear in this plan.</span>';
      body.appendChild(prompt);
      return;
    } else {
      /* Search: ranked, capped results that narrow as the query gets specific */
      var ingMatch = [];
      for (var i = 0; i < EXCL_ING.length; i++) {
        var s = matchScore(EXCL_ING[i], q);
        if (s !== -1) ingMatch.push({ idx: i, score: s });
      }
      ingMatch.sort(function (a, b) {
        return a.score - b.score || EXCL_ING[a.idx].length - EXCL_ING[b.idx].length || EXCL_ING[a.idx].localeCompare(EXCL_ING[b.idx]);
      });
      var ingMatchSet = new Set(ingMatch.map(function (m) { return m.idx; }));

      var nameGroups = [], memberGroups = [];
      EXCL_GRP.forEach(function (g) {
        var nameScore = matchScore(g.l, q);
        if (nameScore !== -1) {
          var nameHits = [];
          for (var k = 0; k < g.m.length; k++) if (ingMatchSet.has(g.m[k])) nameHits.push(g.m[k]);
          nameGroups.push({ score: nameScore, size: g.m.length, key: 'G:' + g.l, title: hi(g.l, q), sub: groupSubtitle(g.l, nameHits, q) });
        } else {
          var hits = [];
          for (var j = 0; j < g.m.length; j++) if (ingMatchSet.has(g.m[j])) hits.push(g.m[j]);
          if (!hits.length) return;
          memberGroups.push({ ratio: hits.length / g.m.length, key: 'G:' + g.l, title: esc(g.l), sub: groupSubtitle(g.l, hits, q) });
        }
      });
      nameGroups.sort(function (a, b) { return a.score - b.score || a.size - b.size; });
      memberGroups.sort(function (a, b) { return b.ratio - a.ratio; });
      groups = nameGroups.concat(memberGroups).slice(0, GRP_CAP);

      ingMatch.slice(0, ING_SHORT_CAP).forEach(function (m) {
        ingRows.push({ key: 'I:' + EXCL_ING[m.idx], title: hi(EXCL_ING[m.idx], q) });
      });
      if (ingMatch.length > ING_SHORT_CAP) {
        ingNote = 'Showing ' + ING_SHORT_CAP + ' of ' + ingMatch.length + ' matches. Keep typing to narrow down';
      }
    }

    if (groups.length) {
      var gh = document.createElement('div');
      gh.className = 'accordion-header';
      gh.textContent = 'Group';
      body.appendChild(gh);
      groups.forEach(function (g) { body.appendChild(cbxRow(g.key, g.title, g.sub)); });
    }
    if (ingRows.length) {
      var ih = document.createElement('div');
      ih.className = 'accordion-header';
      ih.textContent = 'Ingredient';
      body.appendChild(ih);
      ingRows.forEach(function (r) {
        var covers = coveringGroups(r.key.slice(2));
        body.appendChild(cbxRow(r.key, r.title, null, covers.length ? covers.join(', ') : null));
      });
    }
    if (ingNote) {
      var note = document.createElement('div');
      note.style.cssText = 'padding:12px 8px; font-size:12px; font-weight:500; color:var(--n600);';
      note.textContent = ingNote;
      body.appendChild(note);
    }
    if (!groups.length && !ingRows.length) {
      var empty = document.createElement('div');
      empty.style.cssText = 'padding:16px 8px; font-size:14px; font-weight:500; color:var(--n600); text-align:center;';
      empty.textContent = 'No ingredients match your search';
      body.appendChild(empty);
    }
  }

  exclSearch.addEventListener('input', renderExclRail);
  document.getElementById('exclCloseBtn').addEventListener('click', function () { guardExit(closeExclRail); });
  document.getElementById('exclCancelBtn').addEventListener('click', closeExclRail);
  document.getElementById('exclApplyBtn').addEventListener('click', function () {
    exclSelected = new Set(exclPending);
    renderExclusionChips();
    updateSaveButton();
    closeExclRail();
  });

  buildChips('culturalChips', [
    { label: 'african' }, { label: 'asian' }, { label: 'caribbean' },
    { label: 'indian' }, { label: 'latin' }, { label: 'middle eastern' }
  ], { icon: 'check', more: false });

  var cb = document.getElementById('defaultsCheckbox');
  var cbChecked = document.getElementById('cbChecked');
  var cbUnchecked = document.getElementById('cbUnchecked');
  var cbState = true;
  function setCb(v) {
    cbState = v;
    cb.setAttribute('aria-checked', v);
    cbChecked.style.display = v ? 'block' : 'none';
    cbUnchecked.style.display = v ? 'none' : 'block';
  }
  document.getElementById('defaultsCheckboxRow').addEventListener('click', function () { setCb(!cbState); updateSaveButton(); });

  document.getElementById('cancelBtn').addEventListener('click', function () {
    if (panelBaseline) restorePanel(panelBaseline);
    updateSaveButton();
    setPanelVisible(false);
  });
  var saveBtn = document.getElementById('saveBtn');
  saveBtn.addEventListener('click', function () {
    commitPanel();
    var original = saveBtn.textContent;
    saveBtn.textContent = 'Saved';
    setTimeout(function () {
      saveBtn.textContent = original;
      setPanelVisible(false);
    }, 700);
  });

  /* ===== Add recipe: selector + meal details rail ===== */
  var RECIPES = [{"id": "cinnamon-green-smoothie", "name": "Cinnamon Green Smoothie", "mins": 5, "ing": 6, "kcal": 220, "carbs": 28, "protein": 8, "tag": "Low calorie", "mealtime": ["breakfast", "snack"], "mealType": ["smoothie"], "proteins": [], "favorite": false, "used": true, "color": "#CECCA6"}, {"id": "miso-ginger-beef-asparagus-with-quinoa", "name": "Miso Ginger Beef Asparagus with Quinoa", "mins": 35, "ing": 10, "kcal": 520, "carbs": 42, "protein": 38, "tag": "High protein", "mealtime": ["dinner"], "mealType": [], "proteins": ["beef", "meat"], "favorite": false, "used": true, "color": "#CBC3AF"}, {"id": "peanut-butter-protein-yogurt-with-blackberries", "name": "Peanut Butter Protein Yogurt with Blackberries", "mins": 5, "ing": 4, "kcal": 380, "carbs": 22, "protein": 28, "tag": "High protein", "mealtime": ["breakfast", "snack"], "mealType": [], "proteins": [], "favorite": false, "used": false, "color": "#CFAE9A"}, {"id": "blueberry-vanilla-protein-oats", "name": "Blueberry Vanilla Protein Oats", "mins": 10, "ing": 7, "kcal": 420, "carbs": 52, "protein": 24, "tag": "High fiber", "mealtime": ["breakfast"], "mealType": [], "proteins": [], "favorite": false, "used": true, "color": "#D6D0C9"}, {"id": "orange-turmeric-overnight-oats", "name": "Orange Turmeric Overnight Oats", "mins": 10, "ing": 8, "kcal": 390, "carbs": 48, "protein": 18, "tag": "Make ahead", "mealtime": ["breakfast"], "mealType": ["mealprep"], "proteins": [], "favorite": true, "used": false, "color": "#E6D3A8"}, {"id": "greek-yogurt-with-orange-blueberries-pumpkin-seeds", "name": "Greek Yogurt with Orange Blueberries Pumpkin Seeds", "mins": 5, "ing": 4, "kcal": 310, "carbs": 26, "protein": 22, "tag": "Quick", "mealtime": ["breakfast", "snack"], "mealType": [], "proteins": [], "favorite": true, "used": true, "color": "#D1D0C7"}, {"id": "brown-rice", "name": "Brown Rice", "mins": 25, "ing": 3, "kcal": 220, "carbs": 46, "protein": 5, "tag": "High fiber", "mealtime": ["dinner", "lunch", "side"], "mealType": [], "proteins": [], "favorite": false, "used": false, "color": "#8A94A2"}, {"id": "greek-yogurt-with-almonds-and-cherries", "name": "Greek Yogurt with Almonds and Cherries", "mins": 5, "ing": 3, "kcal": 280, "carbs": 18, "protein": 20, "tag": "Quick", "mealtime": ["breakfast", "snack"], "mealType": [], "proteins": [], "favorite": false, "used": false, "color": "#E0D5CD"}, {"id": "celery-with-hummus", "name": "Celery with Hummus", "mins": 5, "ing": 2, "kcal": 120, "carbs": 10, "protein": 4, "tag": "Low calorie", "mealtime": ["lunch", "side", "snack"], "mealType": [], "proteins": [], "favorite": false, "used": false, "color": "#7B7D54"}, {"id": "crackers-with-hummus", "name": "Crackers with Hummus", "mins": 5, "ing": 2, "kcal": 180, "carbs": 22, "protein": 5, "tag": "Low calorie", "mealtime": ["lunch", "side", "snack"], "mealType": [], "proteins": [], "favorite": false, "used": true, "color": "#CDC09F"}, {"id": "dates-and-apple", "name": "Dates and Apple", "mins": 5, "ing": 2, "kcal": 160, "carbs": 38, "protein": 1, "tag": "High fiber", "mealtime": ["side", "snack"], "mealType": [], "proteins": [], "favorite": false, "used": true, "color": "#C7BFA2"}, {"id": "dark-chocolate-with-walnuts", "name": "Dark Chocolate with Walnuts", "mins": 5, "ing": 2, "kcal": 210, "carbs": 14, "protein": 4, "tag": "Low calorie", "mealtime": ["snack"], "mealType": [], "proteins": [], "favorite": false, "used": true, "color": "#988880"}, {"id": "garlic-oil-linguine", "name": "Garlic Oil Linguine", "mins": 20, "ing": 5, "kcal": 480, "carbs": 62, "protein": 12, "tag": "Simple", "mealtime": ["lunch", "dinner"], "mealType": ["pasta"], "proteins": [], "favorite": false, "used": true, "color": "#CBC2A4"}, {"id": "coconut-turmeric-cauliflower-bowls", "name": "Coconut Turmeric Cauliflower Bowls", "mins": 35, "ing": 9, "kcal": 380, "carbs": 28, "protein": 10, "tag": "Simple", "mealtime": ["lunch", "dinner"], "mealType": [], "proteins": [], "favorite": false, "used": false, "color": "#D2CBA5"}, {"id": "almond-butter-banana-sandwich", "name": "Almond Butter Banana Sandwich", "mins": 5, "ing": 3, "kcal": 340, "carbs": 42, "protein": 10, "tag": "Quick", "mealtime": ["breakfast", "snack"], "mealType": ["sandwich"], "proteins": [], "favorite": false, "used": true, "color": "#BDAC95"}, {"id": "apple-with-almond-butter", "name": "Apple with Almond Butter", "mins": 5, "ing": 2, "kcal": 250, "carbs": 28, "protein": 6, "tag": "Quick", "mealtime": ["snack"], "mealType": [], "proteins": [], "favorite": true, "used": false, "color": "#B29176"}, {"id": "grilled-bruschetta-chicken", "name": "Grilled Bruschetta Chicken", "mins": 30, "ing": 8, "kcal": 420, "carbs": 12, "protein": 42, "tag": "High protein", "mealtime": ["dinner"], "mealType": [], "proteins": ["chicken", "meat"], "favorite": false, "used": false, "color": "#BFA095"}, {"id": "hummus-toast-with-avocado", "name": "Hummus Toast with Avocado", "mins": 10, "ing": 4, "kcal": 320, "carbs": 34, "protein": 10, "tag": "Simple", "mealtime": ["breakfast", "lunch"], "mealType": ["sandwich"], "proteins": [], "favorite": false, "used": false, "color": "#A9A793"}, {"id": "mediterranean-turkey-rice-bowl", "name": "Mediterranean Turkey Rice Bowl", "mins": 25, "ing": 8, "kcal": 510, "carbs": 48, "protein": 35, "tag": "High protein", "mealtime": ["lunch", "dinner"], "mealType": [], "proteins": ["meat"], "favorite": true, "used": true, "color": "#AE9378"}, {"id": "kiwi-walnut-overnight-oats", "name": "Kiwi Walnut Overnight Oats", "mins": 10, "ing": 6, "kcal": 360, "carbs": 44, "protein": 14, "tag": "Make ahead", "mealtime": ["breakfast"], "mealType": ["mealprep"], "proteins": [], "favorite": true, "used": true, "color": "#E0DED8"}, {"id": "mediterranean-roasted-tomato-chickpea-bowl", "name": "Mediterranean Roasted Tomato Chickpea Bowl", "mins": 40, "ing": 9, "kcal": 450, "carbs": 52, "protein": 16, "tag": "High fiber", "mealtime": ["lunch", "dinner"], "mealType": [], "proteins": [], "favorite": false, "used": true, "color": "#D9D1C1"}, {"id": "lentil-feta-tabbouleh", "name": "Lentil Feta Tabbouleh", "mins": 25, "ing": 8, "kcal": 380, "carbs": 40, "protein": 18, "tag": "Make ahead", "mealtime": ["lunch"], "mealType": ["salad"], "proteins": [], "favorite": true, "used": false, "color": "#7C7A52"}, {"id": "herby-grilled-chicken-drumsticks", "name": "Herby Grilled Chicken Drumsticks", "mins": 35, "ing": 6, "kcal": 320, "carbs": 4, "protein": 36, "tag": "High protein", "mealtime": ["dinner"], "mealType": [], "proteins": ["chicken", "meat"], "favorite": false, "used": true, "color": "#DFDDD6"}, {"id": "healthy-fish-and-chips", "name": "Healthy Fish and Chips", "mins": 40, "ing": 7, "kcal": 460, "carbs": 38, "protein": 32, "tag": "High protein", "mealtime": ["dinner"], "mealType": [], "proteins": ["fish"], "favorite": false, "used": true, "color": "#CFBAA3"}, {"id": "muesli-with-yogurt-and-blueberries", "name": "Muesli with Yogurt and Blueberries", "mins": 5, "ing": 3, "kcal": 340, "carbs": 48, "protein": 14, "tag": "Quick", "mealtime": ["breakfast"], "mealType": [], "proteins": [], "favorite": true, "used": false, "color": "#CECCCA"}, {"id": "one-pan-chicken-chickpeas-and-broccoli", "name": "One Pan Chicken Chickpeas and Broccoli", "mins": 35, "ing": 7, "kcal": 480, "carbs": 28, "protein": 40, "tag": "One pan", "mealtime": ["dinner"], "mealType": [], "proteins": ["chicken", "meat"], "favorite": false, "used": false, "color": "#D7C7B5"}, {"id": "one-pan-mediterranean-trout", "name": "One Pan Mediterranean Trout", "mins": 30, "ing": 8, "kcal": 420, "carbs": 18, "protein": 36, "tag": "One pan", "mealtime": ["dinner"], "mealType": [], "proteins": ["fish"], "favorite": false, "used": true, "color": "#A78A67"}, {"id": "tart-cherry-limeade-with-pretzels-and-dates", "name": "Tart Cherry Limeade with Pretzels and Dates", "mins": 10, "ing": 4, "kcal": 280, "carbs": 58, "protein": 4, "tag": "High fiber", "mealtime": ["snack"], "mealType": ["drink", "juice"], "proteins": [], "favorite": false, "used": false, "color": "#DFE3E4"}, {"id": "salmon-cucumber-bites", "name": "Salmon Cucumber Bites", "mins": 15, "ing": 5, "kcal": 180, "carbs": 4, "protein": 22, "tag": "Low calorie", "mealtime": ["snack", "lunch"], "mealType": [], "proteins": ["fish"], "favorite": false, "used": true, "color": "#8E6B3D"}, {"id": "one-pan-chicken-curried-brown-rice", "name": "One Pan Chicken Curried Brown Rice", "mins": 40, "ing": 9, "kcal": 520, "carbs": 52, "protein": 34, "tag": "One pan", "mealtime": ["dinner"], "mealType": [], "proteins": ["chicken", "meat"], "favorite": true, "used": false, "color": "#BF9E7C"}, {"id": "sweet-dijon-garden-salad", "name": "Sweet Dijon Garden Salad", "mins": 15, "ing": 7, "kcal": 220, "carbs": 14, "protein": 6, "tag": "Low calorie", "mealtime": ["dinner", "lunch", "side"], "mealType": ["salad"], "proteins": [], "favorite": false, "used": false, "color": "#706E63"}, {"id": "overnight-oats-with-berries-and-walnuts", "name": "Overnight Oats with Berries and Walnuts", "mins": 10, "ing": 6, "kcal": 380, "carbs": 48, "protein": 12, "tag": "Make ahead", "mealtime": ["breakfast"], "mealType": ["mealprep"], "proteins": [], "favorite": false, "used": false, "color": "#CEC4BE"}, {"id": "overnight-bircher-muesli", "name": "Overnight Bircher Muesli", "mins": 10, "ing": 7, "kcal": 360, "carbs": 52, "protein": 10, "tag": "Make ahead", "mealtime": ["breakfast"], "mealType": ["mealprep"], "proteins": [], "favorite": false, "used": false, "color": "#8A8173"}, {"id": "tart-cherry-limeade", "name": "Tart Cherry Limeade", "mins": 5, "ing": 3, "kcal": 120, "carbs": 30, "protein": 0, "tag": "Low calorie", "mealtime": ["dinner", "lunch", "side", "snack"], "mealType": ["drink", "juice"], "proteins": [], "favorite": false, "used": false, "color": "#DCCDC6"}, {"id": "steamed-broccoli", "name": "Steamed Broccoli", "mins": 10, "ing": 2, "kcal": 55, "carbs": 6, "protein": 4, "tag": "Low calorie", "mealtime": ["dinner", "lunch", "side"], "mealType": [], "proteins": [], "favorite": false, "used": false, "color": "#A8AB98"}, {"id": "pretzels-and-dates", "name": "Pretzels and Dates", "mins": 5, "ing": 2, "kcal": 240, "carbs": 52, "protein": 4, "tag": "High fiber", "mealtime": ["side", "snack"], "mealType": [], "proteins": [], "favorite": false, "used": false, "color": "#E5E0D8"}, {"id": "beef-sweet-potato-chili", "name": "Beef Sweet Potato Chili", "mins": 45, "ing": 0, "kcal": 480, "carbs": 38, "protein": 28, "tag": "Make ahead", "mealtime": ["dinner"], "mealType": [], "proteins": [], "favorite": true, "used": false, "color": "#DDCDC4"}];
  var RECIPE_DETAILS = {"cinnamon-green-smoothie": {"diet": ["Vegetarian", "Paleo"], "ing": ["Baby Spinach|2 cups", "Banana (frozen)|1", "Almond Milk|1 cup", "Cinnamon|1 tsp", "Honey|1 tbsp", "Chia Seeds|1 tbsp"], "steps": ["Add everything to a blender.", "Blend until smooth and serve."]}, "miso-ginger-beef-asparagus-with-quinoa": {"diet": ["High protein", "High fiber"], "ing": ["Beef Sirloin|200g", "Asparagus|1 bunch", "Quinoa|1/2 cup", "Miso Paste|2 tbsp", "Fresh Ginger|1 tbsp", "Soy Sauce|2 tbsp", "Sesame Oil|1 tbsp", "Garlic|2 cloves", "Rice Vinegar|1 tbsp", "Sesame Seeds|1 tsp"], "steps": ["Portion everything onto a plate or into a container.", "Serve."]}, "peanut-butter-protein-yogurt-with-blackberries": {"diet": ["Vegetarian", "High protein", "High fiber"], "ing": ["Greek Yogurt|1 cup", "Peanut Butter|2 tbsp", "Protein Powder|1 scoop", "Blackberries|1/2 cup"], "steps": ["Spoon the yogurt into a bowl.", "Top with the remaining ingredients and serve."]}, "blueberry-vanilla-protein-oats": {"diet": ["Vegan", "Vegetarian", "High fiber"], "ing": ["Rolled Oats|1/2 cup", "Almond Milk|1 cup", "Vanilla Protein Powder|1 scoop", "Blueberries|1/2 cup", "Vanilla Extract|1 tsp", "Maple Syrup|1 tbsp", "Chia Seeds|1 tbsp"], "steps": ["Cook the oats with the milk over medium heat until creamy.", "Stir in the sweetener, then top and serve."]}, "orange-turmeric-overnight-oats": {"diet": ["Vegetarian", "High fiber"], "ing": ["Rolled Oats|1/2 cup", "Orange Juice|1/4 cup", "Greek Yogurt|1/4 cup", "Almond Milk|1/2 cup", "Turmeric|1/2 tsp", "Honey|1 tbsp", "Orange Zest|1 tsp", "Walnuts (chopped)|2 tbsp"], "steps": ["Combine the oats, milk and seeds in a jar.", "Refrigerate overnight, at least 8 hours.", "Top with the remaining ingredients before serving."]}, "greek-yogurt-with-orange-blueberries-pumpkin-seeds": {"diet": ["Vegetarian"], "ing": ["Greek Yogurt|1 cup", "Orange Segments|1/2", "Blueberries|1/4 cup", "Pumpkin Seeds|2 tbsp"], "steps": ["Spoon the yogurt into a bowl.", "Top with the remaining ingredients and serve."]}, "brown-rice": {"diet": ["Vegan", "Vegetarian", "High fiber"], "ing": ["Brown Rice|1 cup", "Water|2 cups", "Salt|1/2 tsp"], "steps": ["Rinse the rice, then cook according to the package directions.", "Fluff with a fork and serve."]}, "greek-yogurt-with-almonds-and-cherries": {"diet": ["Vegetarian", "Low glycemic"], "ing": ["Greek Yogurt|1 cup", "Almonds (sliced)|2 tbsp", "Cherries|1/3 cup"], "steps": ["Spoon the yogurt into a bowl.", "Top with the remaining ingredients and serve."]}, "celery-with-hummus": {"diet": ["Vegan", "Vegetarian", "Low glycemic", "Ketogenic", "High fiber"], "ing": ["Celery Sticks|4 stalks", "Hummus|3 tbsp"], "steps": ["Portion everything onto a plate or into a container.", "Serve."]}, "crackers-with-hummus": {"diet": ["Vegan", "Vegetarian", "High fiber"], "ing": ["Whole Grain Crackers|8", "Hummus|3 tbsp"], "steps": ["Portion everything onto a plate or into a container.", "Serve."]}, "dates-and-apple": {"diet": ["Vegan", "Vegetarian", "Paleo"], "ing": ["Medjool Dates|2", "Apple (sliced)|1"], "steps": ["Portion everything onto a plate or into a container.", "Serve."]}, "dark-chocolate-with-walnuts": {"diet": ["Vegan", "Vegetarian", "Paleo", "Low glycemic"], "ing": ["Dark Chocolate (70%)|30g", "Walnuts|2 tbsp"], "steps": ["Portion everything onto a plate or into a container.", "Serve."]}, "garlic-oil-linguine": {"diet": ["Vegan", "Vegetarian"], "ing": ["Linguine|200g", "Garlic|4 cloves", "Extra Virgin Olive Oil|3 tbsp", "Chili Flakes|1/2 tsp", "Parsley (fresh)|2 tbsp"], "steps": ["Cook the pasta according to the package directions.", "Warm the oil and aromatics in a pan.", "Toss the drained pasta through and serve."]}, "coconut-turmeric-cauliflower-bowls": {"diet": ["Vegan", "Vegetarian", "High fiber"], "ing": ["Cauliflower Florets|3 cups", "Coconut Milk|1 can", "Turmeric|1 tsp", "Chickpeas (cooked)|1 cup", "Brown Rice|1 cup", "Red Onion|1/2", "Garlic|2 cloves", "Ginger|1 tsp", "Cilantro|2 tbsp"], "steps": ["Cook the grain according to the package directions.", "Roast or warm the remaining components.", "Assemble in bowls and serve."]}, "almond-butter-banana-sandwich": {"diet": ["Vegan", "Vegetarian"], "ing": ["Whole Wheat Bread|2 slices", "Almond Butter|2 tbsp", "Banana (sliced)|1"], "steps": ["Toast the bread.", "Spread and layer the toppings.", "Slice and serve."]}, "apple-with-almond-butter": {"diet": ["Vegan", "Vegetarian", "Paleo"], "ing": ["Apple (sliced)|1", "Almond Butter|2 tbsp"], "steps": ["Portion everything onto a plate or into a container.", "Serve."]}, "grilled-bruschetta-chicken": {"diet": ["Paleo", "Mediterranean", "Low glycemic", "Ketogenic", "High protein"], "ing": ["Chicken Breast|200g", "Cherry Tomatoes|1 cup", "Fresh Basil|1/4 cup", "Balsamic Vinegar|2 tbsp", "Garlic|2 cloves", "Olive Oil|2 tbsp", "Mozzarella|50g", "Salt & Pepper|to taste"], "steps": ["Heat a grill or grill pan over medium-high heat.", "Season, then grill and turn once until cooked through.", "Rest briefly and serve."]}, "hummus-toast-with-avocado": {"diet": ["Vegan", "Vegetarian", "High fiber"], "ing": ["Sourdough Bread|2 slices", "Hummus|3 tbsp", "Avocado|1/2", "Everything Seasoning|1 tsp"], "steps": ["Toast the bread.", "Spread and layer the toppings.", "Slice and serve."]}, "mediterranean-turkey-rice-bowl": {"diet": ["Mediterranean", "High protein", "High fiber"], "ing": ["Ground Turkey|200g", "Brown Rice|1 cup", "Cucumber|1/2", "Cherry Tomatoes|1/2 cup", "Kalamata Olives|2 tbsp", "Feta Cheese|30g", "Lemon Juice|1 tbsp", "Olive Oil|1 tbsp"], "steps": ["Cook the grain according to the package directions.", "Roast or warm the remaining components.", "Assemble in bowls and serve."]}, "kiwi-walnut-overnight-oats": {"diet": ["Vegetarian", "High fiber"], "ing": ["Rolled Oats|1/2 cup", "Almond Milk|3/4 cup", "Greek Yogurt|1/4 cup", "Kiwi (sliced)|1", "Walnuts (chopped)|2 tbsp", "Honey|1 tbsp"], "steps": ["Combine the oats, milk and seeds in a jar.", "Refrigerate overnight, at least 8 hours.", "Top with the remaining ingredients before serving."]}, "mediterranean-roasted-tomato-chickpea-bowl": {"diet": ["Vegan", "Vegetarian", "Mediterranean", "High fiber"], "ing": ["Chickpeas (cooked)|1.5 cups", "Cherry Tomatoes|2 cups", "Red Onion|1/2", "Garlic|3 cloves", "Olive Oil|2 tbsp", "Cumin|1 tsp", "Paprika|1 tsp", "Fresh Parsley|2 tbsp", "Lemon Juice|1 tbsp"], "steps": ["Heat the oven to 400ºF (205ºC) and line a baking sheet.", "Arrange everything on the sheet and season.", "Roast for 25 to 30 minutes, until cooked through."]}, "lentil-feta-tabbouleh": {"diet": ["Vegetarian", "Mediterranean", "High fiber"], "ing": ["Green Lentils|1 cup", "Feta Cheese|50g", "Fresh Parsley|1/2 cup", "Fresh Mint|1/4 cup", "Cherry Tomatoes|1 cup", "Cucumber|1/2", "Lemon Juice|2 tbsp", "Olive Oil|2 tbsp"], "steps": ["Chop the vegetables and add to a large bowl.", "Whisk the dressing, pour over and toss to coat.", "Season to taste and serve."]}, "herby-grilled-chicken-drumsticks": {"diet": ["Paleo", "Low glycemic", "Ketogenic", "High protein"], "ing": ["Chicken Drumsticks|4", "Fresh Rosemary|2 tbsp", "Fresh Thyme|1 tbsp", "Garlic|3 cloves", "Olive Oil|2 tbsp", "Lemon Juice|1 tbsp"], "steps": ["Heat a grill or grill pan over medium-high heat.", "Season, then grill and turn once until cooked through.", "Rest briefly and serve."]}, "healthy-fish-and-chips": {"diet": ["Pescatarian", "High protein"], "ing": ["White Fish Fillet|200g", "Sweet Potato|1 large", "Panko Breadcrumbs|1/3 cup", "Egg|1", "Olive Oil|2 tbsp", "Lemon|1/2", "Mixed Greens|1 cup"], "steps": ["Heat the oven to 425ºF (220ºC).", "Coat the fish and arrange with the potatoes on a sheet.", "Bake 25 minutes, turning once, until golden."]}, "muesli-with-yogurt-and-blueberries": {"diet": ["Vegetarian"], "ing": ["Muesli|1/2 cup", "Greek Yogurt|3/4 cup", "Blueberries|1/3 cup"], "steps": ["Spoon the yogurt into a bowl.", "Top with the remaining ingredients and serve."]}, "one-pan-chicken-chickpeas-and-broccoli": {"diet": ["Mediterranean", "High protein", "High fiber"], "ing": ["Chicken Thighs|300g", "Chickpeas (cooked)|1 cup", "Broccoli Florets|2 cups", "Olive Oil|2 tbsp", "Garlic|3 cloves", "Paprika|1 tsp", "Lemon|1/2"], "steps": ["Heat the oven to 400ºF (205ºC) and line a baking sheet.", "Arrange everything on the sheet and season.", "Roast for 25 to 30 minutes, until cooked through."]}, "one-pan-mediterranean-trout": {"diet": ["Pescatarian", "Paleo", "Mediterranean", "Low glycemic", "High protein"], "ing": ["Trout Fillet|200g", "Cherry Tomatoes|1 cup", "Kalamata Olives|2 tbsp", "Capers|1 tbsp", "Red Onion|1/4", "Garlic|2 cloves", "Olive Oil|2 tbsp", "Fresh Dill|2 tbsp"], "steps": ["Heat the oven to 400ºF (205ºC) and line a baking sheet.", "Arrange everything on the sheet and season.", "Roast for 25 to 30 minutes, until cooked through."]}, "tart-cherry-limeade-with-pretzels-and-dates": {"diet": ["Vegan", "Vegetarian"], "ing": ["Tart Cherry Juice|1 cup", "Lime Juice|2 tbsp", "Mini Pretzels|1/2 cup", "Medjool Dates|2"], "steps": ["Stir the juice and lime together in a glass with ice.", "Top with sparkling water and serve."]}, "salmon-cucumber-bites": {"diet": ["Pescatarian", "Low glycemic", "Ketogenic"], "ing": ["Smoked Salmon|100g", "Cucumber|1", "Cream Cheese|2 tbsp", "Fresh Dill|1 tbsp", "Lemon Zest|1 tsp"], "steps": ["Slice the base and arrange on a platter.", "Top with the remaining ingredients and serve."]}, "one-pan-chicken-curried-brown-rice": {"diet": ["High protein", "High fiber"], "ing": ["Chicken Breast|200g", "Brown Rice|1 cup", "Curry Powder|2 tsp", "Coconut Milk|1/2 cup", "Onion|1", "Garlic|2 cloves", "Ginger|1 tsp", "Peas|1/2 cup", "Cilantro|2 tbsp"], "steps": ["Heat the oven to 400ºF (205ºC) and line a baking sheet.", "Arrange everything on the sheet and season.", "Roast for 25 to 30 minutes, until cooked through."]}, "sweet-dijon-garden-salad": {"diet": ["Vegetarian", "Paleo", "Mediterranean", "Low glycemic"], "ing": ["Mixed Greens|3 cups", "Cherry Tomatoes|1/2 cup", "Cucumber|1/2", "Red Onion|2 tbsp", "Dijon Mustard|1 tbsp", "Honey|1 tsp", "Olive Oil|2 tbsp"], "steps": ["Chop the vegetables and add to a large bowl.", "Whisk the dressing, pour over and toss to coat.", "Season to taste and serve."]}, "overnight-oats-with-berries-and-walnuts": {"diet": ["Vegan", "Vegetarian", "High fiber"], "ing": ["Rolled Oats|1/2 cup", "Almond Milk|3/4 cup", "Mixed Berries|1/2 cup", "Walnuts (chopped)|2 tbsp", "Maple Syrup|1 tbsp", "Chia Seeds|1 tbsp"], "steps": ["Combine the oats, milk and seeds in a jar.", "Refrigerate overnight, at least 8 hours.", "Top with the remaining ingredients before serving."]}, "overnight-bircher-muesli": {"diet": ["Vegetarian", "High fiber"], "ing": ["Rolled Oats|1/2 cup", "Apple (grated)|1", "Almond Milk|1/2 cup", "Greek Yogurt|1/4 cup", "Honey|1 tbsp", "Almonds (sliced)|2 tbsp", "Sultanas|1 tbsp"], "steps": ["Combine the oats, milk and seeds in a jar.", "Refrigerate overnight, at least 8 hours.", "Top with the remaining ingredients before serving."]}, "tart-cherry-limeade": {"diet": ["Vegan", "Vegetarian", "Paleo"], "ing": ["Tart Cherry Juice|1 cup", "Lime Juice|2 tbsp", "Sparkling Water|1/2 cup"], "steps": ["Stir the juice and lime together in a glass with ice.", "Top with sparkling water and serve."]}, "steamed-broccoli": {"diet": ["Vegan", "Vegetarian", "Paleo", "Low glycemic", "Ketogenic", "High fiber"], "ing": ["Broccoli Florets|2 cups", "Salt|1/4 tsp"], "steps": ["Steam until bright green and tender, about 5 minutes.", "Season and serve."]}, "pretzels-and-dates": {"diet": ["Vegan", "Vegetarian"], "ing": ["Mini Pretzels|1 cup", "Medjool Dates|3"], "steps": ["Portion everything onto a plate or into a container.", "Serve."]}, "beef-sweet-potato-chili": {"diet": ["High protein"], "ing": [], "steps": ["Brown the meat in a large pot.", "Add the remaining ingredients and bring to a boil.", "Simmer for 30 minutes, until thickened."]}};
  

  /* Facet taxonomy. "side" lives under Mealtime, so there is no separate dish facet. */
  var FILTER_SECTIONS = [
    { key: 'mealtime',  label: 'Meal time', cap: true,
      values: ['appetizer', 'breakfast', 'dessert', 'dinner', 'lunch', 'side', 'snack'] },
    { key: 'appliance', label: 'Cooking appliance',
      values: ['airfryer', 'barbecue', 'freezer', 'onepan', 'pressure cooker', 'slow cooker'] },
    { key: 'mealType',  label: 'Meal type',
      values: ['burger', 'cookie', 'dressing', 'drink', 'juice', 'mealprep', 'muffin', 'pancake',
               'pasta', 'pizza', 'salad', 'sandwich', 'seasoning', 'smoothie', 'soup', 'taco', 'wrap'] },
    { key: 'proteins',  label: 'Protein', values: ['beef', 'chicken', 'fish', 'meat', 'pork'] }
  ];
  /* Cooking appliance isn't in the source data, so infer it from the recipe
     name and its directions. Only values that actually match are offered. */
  (function inferAppliances() {
    var RULES = [
      ['onepan',          /one pan|sheet pan|baking sheet|tray/i],
      ['barbecue',        /grill/i],
      ['slow cooker',     /slow cooker/i],
      ['pressure cooker', /pressure cooker|instant pot/i],
      ['airfryer',        /air fry|airfry/i],
      ['freezer',         /freeze|frozen/i]
    ];
    RECIPES.forEach(function (r) {
      var det = RECIPE_DETAILS[r.id] || { steps: [] };
      var blob = r.name + ' ' + (det.steps || []).join(' ');
      r.appliance = RULES.filter(function (rule) { return rule[1].test(blob); })
                         .map(function (rule) { return rule[0]; });
    });
  })();
  var APPLIANCES_PRESENT = (function () {
    var seen = {};
    RECIPES.forEach(function (r) { (r.appliance || []).forEach(function (a) { seen[a] = true; }); });
    return Object.keys(seen).sort();
  })();

  /* Nutrition presets, plus a custom mode that unlocks the range fields */
  var NUTRI_MODES = [
    { value: 'none',     label: 'No preference' },
    { value: 'protein',  label: 'High protein' },
    { value: 'lowcal',   label: 'Low calorie' },
    { value: 'custom',   label: 'Custom' }
  ];
  var NUTRI_FIELDS = [
    { key: 'kcal',    label: 'Calories (kcal)', bands: [[0,200],[200,350],[350,450],[450,null]] },
    { key: 'protein', label: 'Protein (g)',     bands: [[0,10],[10,20],[20,30],[30,null]] },
    { key: 'fat',     label: 'Fat (g)',         bands: [[0,8],[8,15],[15,22],[22,null]] },
    { key: 'sugar',   label: 'Sugar (g)',       bands: [[0,7],[7,12],[12,17],[17,null]] },
    { key: 'carbs',   label: 'Carbs (g)',       bands: [[0,20],[20,40],[40,55],[55,null]] }
  ];
  /* the unit lives in the field label, so options are just numbers */
  function bandLabel(band) {
    if (band[0] === 0) return 'Under ' + band[1];
    if (band[1] === null) return band[0] + '+';
    return band[0] + '\u2013' + band[1];
  }
  /* presets simply populate the fields, so the two can never disagree */
  var NUTRI_PRESETS = {
    protein: { protein: '20:30' },
    lowcal:  { kcal: '0:200' }
  };

  function emptyFilters() {
    return { collectionOnly: false, mealtime: [], appliance: [], mealType: [], proteins: [],
             nutriMode: 'none', ranges: {} };
  }

  /* Generic notes; per-recipe notes would come from the recipe source */
  var RECIPE_NOTES = [
    "Leftovers: Refrigerate in an airtight container for up to three days.",
    "Serving size: One serving is approximately one bowl.",
    "More flavour: Add a squeeze of lemon juice."
  ];

  /* Nutrition derived from the recipe's own macros so the numbers stay consistent */
  var DV = { kcal: 2000, carbs: 275, fat: 78, protein: 50, fiber: 28, sugar: 50, sodium: 2300, cholesterol: 300 };
  /* Derived once, so a recipe's tab and the day summary can never disagree */
  function macrosOf(r) {
    return {
      kcal: r.kcal, carbs: r.carbs, protein: r.protein,
      fat: Math.max(3, Math.round((r.kcal - r.carbs * 4 - r.protein * 4) / 9)),
      fiber: Math.round(r.carbs * 0.18),
      sugar: Math.round(r.carbs * 0.32),
      cholesterol: Math.round(r.protein * 1.6),
      sodium: Math.round(r.kcal * 0.8),
      vitaminA: Math.round(r.kcal * 1.6),
      vitaminC: Math.round(r.ing * 3.5),
      calcium: Math.round(r.protein * 3.2),
      iron: Math.round(r.ing * 4) / 10
    };
  }

  function nutritionFor(r) {
    var m = macrosOf(r);
    var fat = m.fat, fiber = m.fiber, sugar = m.sugar, sodium = m.sodium, chol = m.cholesterol;
    var pct = function (v, d) { return Math.round((v / d) * 100) + '%'; };
    return {
      fat: fat,
      bar: [
        { color: 'var(--lake200)',  g: r.carbs * 4 },
        { color: 'var(--creamsicle200)', g: fat * 9 },
        { color: 'var(--spring400)', g: r.protein * 4 }
      ],
      rows: [
        { label: 'Calories', text: r.kcal + ' kcal · ' + pct(r.kcal, DV.kcal) },
        { label: 'Carbs',    text: r.carbs + ' g · ' + pct(r.carbs, DV.carbs), chip: 'lake' },
        { label: 'Fat',      text: fat + ' g · ' + pct(fat, DV.fat), chip: 'creamsicle' },
        { label: 'Protein',  text: r.protein + ' g · ' + pct(r.protein, DV.protein), chip: 'spring' },
        { label: 'Fiber',    text: fiber + ' g · ' + pct(fiber, DV.fiber) },
        { label: 'Sugar',    text: sugar + ' g · ' + pct(sugar, DV.sugar) },
        { label: 'Cholesterol', text: chol + ' mg · ' + pct(chol, DV.cholesterol) },
        { label: 'Sodium',   text: sodium + ' mg · ' + pct(sodium, DV.sodium) }
      ]
    };
  }

  var IC_NOIMG = ico('image', 24, 'noimg-icon');
  /* one recipe has no photo, so every image slot has a placeholder state */
  function imgTag(tag, cls, r, inner) {
    var u = RECIPE_IMG[r.id];
    return '<' + tag + ' class="' + cls + (u ? '' : ' no-img') + '"' +
      (u ? ' style="background-image:url(' + u + ')"' : '') + '>' +
      (u ? '' : IC_NOIMG) + (inner || '') + '</' + tag + '>';
  }

  function recipeById(id) { return RECIPES.find(function (r) { return r.id === id; }); }

  var IC_CLOCK = ico('clock', 16);
  var IC_BASKET = ico('grocery', 16);
  var IC_NUTR = ico('nutrients', 20);
  var IC_SWAP = ico('compare-arrows', 20);
  var IC_TRASH = ico('trash-delete', 20);
  var RADIO_ON = ico('radio-filled', 20);
  var RADIO_OFF = ico('radio-blank', 20);
  var IC_WARN = ico('danger-warning', 24);
  var IC_MINUS = ico('remove', 20);
  var IC_PLUS = ico('add', 20);

  function metaRow(r) {
    return '<div class="card-meta">' +
      '<span class="meta-item">' + IC_CLOCK + r.mins + ' mins</span>' +
      '<span class="meta-item">' + IC_BASKET + r.ing + ' ingredients</span>' +
      '<span class="meta-item">' + IC_NUTR + r.kcal + ' kcal · ' + r.carbs + 'g carbs · ' + r.protein + 'g protein</span>' +
      '</div>';
  }

  var recipeRail = document.getElementById('recipeRail');
  var recipeRailTitle = document.getElementById('recipeRailTitle');
  var recipeRailSub = document.getElementById('recipeRailSub');
  var recipeBackBtn = document.getElementById('recipeBackBtn');
  var recipeSelectBody = document.getElementById('recipeSelectBody');
  var recipeDetailsBody = document.getElementById('recipeDetailsBody');
  var recipeSearch = document.getElementById('recipeSearch');
  var railCtx = {
    day: DAYS[0], row: 0, mode: 'select', dish: 'Main', targetIdx: null,
    q: '', filters: null, draft: null,
    infoId: null, infoFrom: 'select', infoTab: 'Ingredients'
  };

  railCtx.filters = emptyFilters();

  var toastTimer = null;
  function showToast(msg, undo) {
    var toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    var old = toast.querySelector('.t-undo');
    if (old) old.remove();
    if (undo) {
      var btn = document.createElement('button');
      btn.className = 't-undo';
      btn.textContent = 'Undo';
      btn.addEventListener('click', function () {
        toast.classList.add('hidden');
        clearTimeout(toastTimer);
        undo();
      });
      toast.querySelector('.t-body').insertBefore(btn, document.getElementById('toastClose'));
    }
    toast.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.add('hidden'); }, undo ? 5000 : 2200);
  }

  function itemsFor() { return cellItems[cellKey(railCtx.day, railCtx.row)] || []; }
  function findDish(items, dish) { return items.filter(function (it) { return it.dish === dish; })[0] || null; }

  /* A meal cell and a day header are two ways into the same right rail, so only
     one of them may read as selected at a time. */
  function setSelectedCell(day, row) {
    Object.keys(cellEls).forEach(function (k) { cellEls[k].classList.remove('selected'); });
    if (day !== null) {
      cellEls[cellKey(day, row)].classList.add('selected');
      clearActiveDay();
    }
  }

  function renderCell(day, row) {
    var cell = cellEls[cellKey(day, row)];
    var items = cellItems[cellKey(day, row)] || [];
    if (!items.length) {
      cell.classList.remove('filled');
      cell.innerHTML = ICONS.add + '<span class="add-label">Add</span>';
      return;
    }
    cell.classList.add('filled');
    var main = findDish(items, 'Main');
    var side = findDish(items, 'Side');

    function tile(it) {
      var r = recipeById(it.recipeId);
      return imgTag('span', 'cell-img', r, it.leftover ? '<span class="cell-lo">Leftover</span>' : '');
    }
    /* A meal with a side but no main is flagged, not hidden */
    var mainTile = main ? tile(main) : '<span class="cell-img no-main">' + IC_WARN + '</span>';
    var imgs = mainTile + (side ? tile(side) : '');

    cell.innerHTML =
      '<span class="cell-imgs">' + imgs + '</span>' +
      '<span class="cell-body">' +
        '<span class="cr-name' + (main ? '' : ' warn') + '"></span>' +
        (side ? '<span class="cr-side"></span>' : '') +
      '</span>';
    cell.querySelector('.cr-name').textContent = main ? recipeById(main.recipeId).name : 'No main';
    if (side) cell.querySelector('.cr-side').textContent = '+ ' + recipeById(side.recipeId).name;

    var dayIdx = DAYS.indexOf(day);
    var acts = document.createElement('span');
    acts.className = 'cell-actions';
    /* spans with a button role: the cell itself is already a <button> */
    var add = function (cls, icon, label, fn) {
      var b = document.createElement('span');
      b.className = 'cell-act tip tip-down' + (cls ? ' ' + cls : '');
      b.setAttribute('role', 'button');
      b.setAttribute('tabindex', '0');
      b.setAttribute('aria-label', label);
      b.dataset.tip = label;
      b.innerHTML = icon;
      var fire = function (e) { e.stopPropagation(); fn(); };
      b.addEventListener('click', fire);
      b.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') fire(e); });
      acts.appendChild(b);
      return b;
    };

    add('', IC_SWAP, 'Swap recipe', function () { swapFromCell(day, row); });
    if (dayIdx < DAYS.length - 1) {
      add('', IC_REPEAT, 'Repeat on ' + DAYS[dayIdx + 1], function () { repeatMeal(day, row); });
    }
    add('danger', IC_TRASH, 'Remove meal', function () { removeMeal(day, row); });
    cell.appendChild(acts);
  }

  /* Open the rail in swap mode for this meal's main */
  function swapFromCell(day, row) {
    var items = cellItems[cellKey(day, row)] || [];
    var main = findDish(items, 'Main');
    var idx = items.indexOf(main || items[0]);
    if (idx === -1) return;
    railCtx.day = day;
    railCtx.row = row;
    railCtx.dish = items[idx].dish;
    railCtx.targetIdx = idx;
    railCtx.mode = 'select';
    resetSelector();
    pushPanel(recipeRail);
    setSelectedCell(day, row);
    renderRecipeRail();
    recipeSearch.focus();
  }

  /* Clearing a meal from the grid is one click, so it has to be undoable */
  function removeMeal(day, row) {
    touchActivePlan();
    var items = cellItems[cellKey(day, row)] || [];
    if (!items.length) return;
    var backup = items.map(function (it) {
      return { recipeId: it.recipeId, dish: it.dish, servings: it.servings, portions: it.portions, leftover: it.leftover };
    });
    cellItems[cellKey(day, row)] = [];
    renderCell(day, row);
    updateDayTotals(day);
    if (railCtx.day === day && railCtx.row === row && !recipeRail.classList.contains('hidden-panel')) {
      railCtx.mode = 'select';
      railCtx.dish = 'Main';
      railCtx.targetIdx = null;
      renderRecipeRail();
    }
    showToast('Removed ' + MEALS[row].name.toLowerCase() + ' from ' + day, function () {
      cellItems[cellKey(day, row)] = backup;
      renderCell(day, row);
      updateDayTotals(day);
      showToast('Restored');
    });
  }

  var IC_REPEAT = ico('event-repeat', 20);

  /* Copy a meal into the next day and mark the copy as a leftover */
  function repeatMeal(day, row) {
    touchActivePlan();
    var dayIdx = DAYS.indexOf(day);
    var next = DAYS[dayIdx + 1];
    if (!next) return;
    var items = cellItems[cellKey(day, row)] || [];
    if (!items.length) return;
    if ((cellItems[cellKey(next, row)] || []).length) {
      showToast(next + '\u2019s ' + MEALS[row].name.toLowerCase() + ' is already filled');
      return;
    }
    cellItems[cellKey(next, row)] = items.map(function (it) {
      return { recipeId: it.recipeId, dish: it.dish, servings: it.servings, portions: it.portions, leftover: true };
    });
    renderCell(next, row);
    updateDayTotals(next);
    showToast('Repeated on ' + next + ' as leftovers');
  }

  function touchActivePlan() {
    var plan = plans.find(function (p) { return p.id === activePlanId; });
    if (plan) plan.editedAt = Date.now();
  }
  function updateDayTotals(day) {
    if (nutriRail && !nutriRail.classList.contains('hidden-panel') && day === nsDay) {
      setTimeout(renderNutriRail, 0);        /* summary follows edits to the plan */
    }
    /* same segmented bar as the nutrition card: macro split against the target */
    var kc = { carbs: 0, fat: 0, protein: 0 };
    var total = 0;
    MEALS.forEach(function (m, ri) {
      (cellItems[cellKey(day, ri)] || []).forEach(function (it) {
        var r = recipeById(it.recipeId);
        if (!r) return;
        var mm = macrosOf(r);
        total += mm.kcal * it.portions;
        kc.carbs += mm.carbs * 4 * it.portions;
        kc.fat += mm.fat * 9 * it.portions;
        kc.protein += mm.protein * 4 * it.portions;
      });
    });
    dayEls[day].kcal.textContent = total.toLocaleString('en-US') + ' kcal';

    var macroKcal = kc.carbs + kc.fat + kc.protein;
    var target = savedPrefs.targetOn ? savedPrefs.calories : (state.calories || 0);
    var denom = target || macroKcal;
    var scale = (target && macroKcal > target) ? target / macroKcal : 1;

    var bar = dayEls[day].bar;
    bar.innerHTML = '';
    if (!macroKcal) return;                 /* empty day leaves the track bare */
    [['carbs', 'var(--lake600)'], ['fat', 'var(--creamsicle200)'], ['protein', 'var(--spring400)']].forEach(function (seg) {
      var el = document.createElement('span');
      el.style.cssText = 'background:' + seg[1] + '; width:' + ((kc[seg[0]] * scale / denom) * 100) + '%;';
      bar.appendChild(el);
    });
    /* the shortfall is drawn as its own segment, as in the component */
    if (target && macroKcal < target) {
      var rest = document.createElement('span');
      rest.className = 'rest';
      bar.appendChild(rest);
    }
  }

  function onCellClick(day, row) {
    guardExit(function () {
      railCtx.day = day;
      railCtx.row = row;
      railCtx.dish = 'Main';
      railCtx.targetIdx = null;
      railCtx.mode = (cellItems[cellKey(day, row)] || []).length ? 'details' : 'select';
      resetSelector();
      var wasHidden = recipeRail.classList.contains('hidden-panel');
      if (wasHidden) railJustOpened = true;
      pushPanel(recipeRail);
      setSelectedCell(day, row);
      renderRecipeRail();
      if (railCtx.mode === 'select') { recipeSearch.value = ''; recipeSearch.focus(); }
    });
  }

  /* --- Recipe details --- */
  function openRecipeInfo(id, from) {
    railCtx.infoId = id;
    railCtx.infoFrom = from;
    railCtx.infoTab = 'Ingredients';
    railCtx.mode = 'info';
    renderRecipeRail();
  }

  function renderRecipeInfo() {
    var r = recipeById(railCtx.infoId);
    var det = RECIPE_DETAILS[r.id] || { diet: [], ing: [], steps: [] };
    var wrap = document.getElementById('recipeInfoScroll');
    wrap.innerHTML = '';

    var card = document.createElement('div');
    card.className = 'rd-card';
    card.innerHTML =
      imgTag('div', 'rd-img', r) +
      '<div class="rd-body">' +
        '<div style="display:flex; flex-direction:column; gap:4px;">' +
          '<span class="rd-title"></span>' +
          '<span class="card-meta">' +
            '<span class="meta-item">' + IC_CLOCK + r.mins + ' mins</span>' +
            '<span class="meta-item">' + IC_BASKET + det.ing.length + ' ingredients</span>' +
          '</span>' +
          '<span class="rd-tags">' + det.diet.slice(0, 3).map(function (t) { return '<span class="tag-green">' + t + '</span>'; }).join('') + '</span>' +
        '</div>' +
      '</div>';
    card.querySelector('.rd-title').textContent = r.name;

    /* The action only exists when a slot is waiting to be filled */
    if (railCtx.infoFrom === 'select') {
      var actions = document.createElement('div');
      actions.className = 'rd-actions';
      var swapping = railCtx.targetIdx !== null;
      var actBtn = document.createElement('button');
      actBtn.className = 'btn btn-secondary';
      actBtn.innerHTML = (swapping ? IC_SWAP : IC_PLUS) +
        '<span>' + (swapping ? 'Swap recipe' : 'Select recipe') + '</span>';
      actBtn.addEventListener('click', function () { pickRecipe(r.id); });
      actions.appendChild(actBtn);
      card.querySelector('.rd-body').appendChild(actions);
    }
    wrap.appendChild(card);

    var tabs = document.createElement('div');
    tabs.className = 'rd-tabs';
    ['Ingredients', 'Nutrition', 'Directions'].forEach(function (name) {
      var t = document.createElement('button');
      t.className = 'tab-item' + (railCtx.infoTab === name ? ' active' : '');
      t.textContent = name;
      t.addEventListener('click', function () { railCtx.infoTab = name; renderRecipeInfo(); });
      tabs.appendChild(t);
    });
    wrap.appendChild(tabs);

    var sec = document.createElement('div');
    sec.className = 'rd-sec';

    if (railCtx.infoTab === 'Ingredients') {
      sec.innerHTML = '<div class="rd-sec-head">Per 1 serving</div>';
      var list = document.createElement('div');
      list.className = 'nv-list';
      det.ing.forEach(function (entry) {
        var parts = entry.split('|');
        var row = document.createElement('div');
        row.className = 'nv-row';
        row.innerHTML = '<span class="nv-label"></span><span class="nv-chip">' + parts[1] + '</span>';
        row.querySelector('.nv-label').textContent = parts[0];
        list.appendChild(row);
      });
      sec.appendChild(list);
    } else if (railCtx.infoTab === 'Nutrition') {
      var n = nutritionFor(r);
      sec.innerHTML = '<div class="rd-sec-head">Per 1 serving</div>';
      var total = n.bar.reduce(function (t, seg) { return t + seg.g; }, 0) || 1;
      var bar = document.createElement('div');
      bar.className = 'seg-bar';
      n.bar.forEach(function (seg) {
        var el = document.createElement('span');
        el.style.cssText = 'background:' + seg.color + '; width:' + ((seg.g / total) * 100) + '%;';
        bar.appendChild(el);
      });
      sec.appendChild(bar);
      var nlist = document.createElement('div');
      nlist.className = 'nv-list';
      n.rows.forEach(function (row) {
        var el = document.createElement('div');
        el.className = 'nv-row';
        el.innerHTML = '<span class="nv-label">' + row.label + '</span>' +
          '<span class="nv-chip' + (row.chip ? ' ' + row.chip : '') + '">' + row.text + '</span>';
        nlist.appendChild(el);
      });
      sec.appendChild(nlist);
      var foot = document.createElement('div');
      foot.className = 'rd-foot';
      foot.textContent = '% Daily Value \u2248 2,000 Calorie Diet';
      sec.appendChild(foot);
    } else {
      sec.innerHTML = '<div class="rd-sec-head">Directions</div>';
      det.steps.forEach(function (step) {
        var el = document.createElement('p');
        el.className = 'rd-step';
        el.textContent = step;
        sec.appendChild(el);
      });
      var notes = document.createElement('div');
      notes.className = 'rd-sec';
      notes.innerHTML = '<div class="rd-sec-head">Notes</div>';
      RECIPE_NOTES.forEach(function (note) {
        var el = document.createElement('p');
        el.className = 'rd-step';
        el.textContent = note;
        notes.appendChild(el);
      });
      sec.appendChild(notes);
    }
    wrap.appendChild(sec);
  }

  /* Re-adding the class alone won't replay a CSS animation, so force a reflow */
  function playAnim(el, cls) {
    if (!el || reducedMotion) return;
    el.classList.remove('rail-push', 'rail-pop');
    void el.offsetWidth;
    el.classList.add(cls);
  }

  /* Rail depth tells us whether a change is a drill-down or a step back */
  var RAIL_DEPTH = { details: 0, select: 1, filter: 2, info: 2 };
  var railPrevMode = null;
  var railJustOpened = false;

  function renderRecipeRail() {
    var mealName = MEALS[railCtx.row].name;
    var filterBody = document.getElementById('recipeFilterBody');
    var infoBody = document.getElementById('recipeInfoBody');
    var bodies = { select: recipeSelectBody, details: recipeDetailsBody, filter: filterBody, info: infoBody };
    /* only the body being shown should carry an animation class */
    Object.keys(bodies).forEach(function (k) {
      if (k !== railCtx.mode) bodies[k].classList.remove('rail-push', 'rail-pop');
    });
    if (railJustOpened) {
      railJustOpened = false;                       /* panel slide covers it */
      bodies[railCtx.mode].classList.remove('rail-push', 'rail-pop');
      railPrevMode = railCtx.mode;
    } else if (railPrevMode !== railCtx.mode) {
      var deeper = RAIL_DEPTH[railCtx.mode] > RAIL_DEPTH[railPrevMode];
      playAnim(bodies[railCtx.mode], deeper ? 'rail-push' : 'rail-pop');
      railPrevMode = railCtx.mode;
    }
    if (railCtx.mode === 'info') {
      recipeRailTitle.textContent = 'Recipe details';
      recipeRailSub.classList.add('hidden');
      recipeBackBtn.classList.toggle('hidden', !railCtx.infoFrom);
      recipeSelectBody.classList.add('hidden');
      recipeDetailsBody.classList.add('hidden');
      filterBody.classList.add('hidden');
      infoBody.classList.remove('hidden');
      renderRecipeInfo();
      return;
    }
    infoBody.classList.add('hidden');
    if (railCtx.mode === 'filter') {
      recipeRailTitle.textContent = 'Filter recipes';
      recipeRailSub.classList.add('hidden');
      recipeBackBtn.classList.add('hidden');
      recipeSelectBody.classList.add('hidden');
      recipeDetailsBody.classList.add('hidden');
      filterBody.classList.remove('hidden');
      renderFilterSections();
      return;
    }
    filterBody.classList.add('hidden');
    if (railCtx.mode === 'select') {
      /* Title names the action: swapping an existing dish vs filling an empty one */
      var swapping = railCtx.targetIdx !== null;
      recipeRailTitle.textContent = (swapping ? 'Swap ' : 'Select ') + railCtx.dish.toLowerCase();
      var target = swapping ? itemsFor()[railCtx.targetIdx] : null;
      recipeRailSub.textContent = target
        ? recipeById(target.recipeId).name
        : mealName + ' · ' + railCtx.dish + ' · ' + railCtx.day;
      recipeRailSub.classList.remove('hidden');
      recipeBackBtn.classList.toggle('hidden', !itemsFor().length);
      recipeSelectBody.classList.remove('hidden');
      recipeDetailsBody.classList.add('hidden');
      renderResults();
    } else {
      recipeRailTitle.textContent = mealName + ' details';
      recipeRailSub.classList.add('hidden');
      recipeBackBtn.classList.add('hidden');
      recipeSelectBody.classList.add('hidden');
      recipeDetailsBody.classList.remove('hidden');
      renderDetails();
    }
  }

  /* --- Filtering --- */
  function sectionByKey(key) {
    return FILTER_SECTIONS.filter(function (sec) { return sec.key === key; })[0];
  }
  function sectionValues(sec) {
    return sec.values || [];
  }
  /* Meal time reads as Breakfast; recipe tags stay lowercase as in the data */
  function valueLabel(key, value) {
    var sec = sectionByKey(key);
    if (!sec) return value;
    var found = sectionValues(sec).filter(function (v) { return v === value || v.value === value; })[0];
    var label = (found && found.label) ? found.label : value;
    return sec.cap ? label.charAt(0).toUpperCase() + label.slice(1) : label;
  }
  /* the toggle button shows its own state, so it isn't repeated as a chip */
  function hasActiveFilters() {
    return activeFilterList().length > 0 || !!railCtx.filters.collectionOnly;
  }
  function activeFilterList() {
    var out = [];
    FILTER_SECTIONS.forEach(function (sec) {
      (railCtx.filters[sec.key] || []).forEach(function (v) {
        out.push({ group: sec.key, value: v, label: valueLabel(sec.key, v) });
      });
    });
    /* one chip per range in force, so the header says what's actually applied */
    var ranges = railCtx.filters.ranges || {};
    NUTRI_FIELDS.forEach(function (f) {
      var v = ranges[f.key];
      if (!v) return;
      var parts = v.split(':');
      var band = [ +parts[0], parts[1] === '' ? null : +parts[1] ];
      out.push({ group: 'range', value: f.key, label: f.label.replace(/ \([^)]*\)/, '') + ' ' + bandLabel(band) });
    });
    return out;
  }
  function toggleFilter(store, group, value) {
    if (group === 'collectionOnly') { store.collectionOnly = false; return; }
    if (group === 'range') {
      delete store.ranges[value];
      if (!Object.keys(store.ranges).length) store.nutriMode = 'none';
      return;
    }
    var arr = store[group];
    if (!arr) return;
    var i = arr.indexOf(value);
    if (i === -1) arr.push(value); else arr.splice(i, 1);
  }
  function matchesFilters(r, f) {
    if (f.collectionOnly && collectionRecipeIds().indexOf(r.id) === -1) return false;
    if (f.mealtime.length && !f.mealtime.some(function (v) { return r.mealtime.indexOf(v) !== -1; })) return false;
    if (f.appliance && f.appliance.length &&
        !f.appliance.some(function (v) { return (r.appliance || []).indexOf(v) !== -1; })) return false;
    if (f.mealType.length && !f.mealType.some(function (v) { return r.mealType.indexOf(v) !== -1; })) return false;
    if (f.proteins.length && !f.proteins.some(function (v) { return r.proteins.indexOf(v) !== -1; })) return false;

    var m = macrosOf(r);
    if (f.ranges) {
      for (var k in f.ranges) {
        var band = f.ranges[k];
        if (!band) continue;
        var parts = band.split(':');           /* "min:max", max blank means open-ended */
        var lo = +parts[0], hi = parts[1] === '' ? Infinity : +parts[1];
        if (m[k] < lo || m[k] > hi) return false;
      }
    }
    return true;
  }
  function recipesFor(f, q) {
    var query = (q || '').trim().toLowerCase();
    return RECIPES.filter(function (r) {
      if (query && r.name.toLowerCase().indexOf(query) === -1) return false;
      return matchesFilters(r, f);
    });
  }
  function filteredRecipes() { return recipesFor(railCtx.filters, railCtx.q); }

  /* --- Controls --- */
  function renderControls(results) {
    var actives = activeFilterList();

    var chipWrap = document.getElementById('filterChips');
    chipWrap.innerHTML = '';
    chipWrap.classList.toggle('hidden', !actives.length);

    /* Keep the row to three chips; the rest roll into a +N that opens the panel */
    var CHIP_CAP = 3;
    var overflow = actives.length > CHIP_CAP ? actives.length - (CHIP_CAP - 1) : 0;
    var shown = overflow ? actives.slice(0, CHIP_CAP - 1) : actives;

    shown.forEach(function (a) {
      var chip = document.createElement('span');
      chip.className = 'f-chip';
      chip.innerHTML = a.label + '<button class="x-btn" aria-label="Remove ' + a.label + ' filter">' + CLOSE_X + '</button>';
      chip.querySelector('.x-btn').addEventListener('click', function () {
        toggleFilter(railCtx.filters, a.group, a.value);
        renderResults();
      });
      chipWrap.appendChild(chip);
    });
    if (overflow) {
      var more = document.createElement('button');
      more.className = 'f-chip';
      more.textContent = '+' + overflow;
      more.setAttribute('aria-label', overflow + ' more filters. Open filter panel');
      more.addEventListener('click', openFilterPanel);
      chipWrap.appendChild(more);
    }

    document.getElementById('resultCount').textContent =
      results.length.toLocaleString('en-US') + (results.length === 1 ? ' recipe' : ' recipes');
    document.getElementById('clearFiltersBtn').classList.toggle('hidden', !actives.length && !railCtx.q && !railCtx.filters.collectionOnly);
  }


  function renderFilterSections() {
    var wrap = document.getElementById('filterSections');
    wrap.innerHTML = '';

    /* the warning states the consequence of the current draft */
    var n = recipesFor(railCtx.draft, railCtx.q).length;
    if (n <= 3) {
      var alertEl = document.createElement('div');
      alertEl.className = 'fs-alert';
      alertEl.innerHTML = '<span class="fa-bar"></span><span class="fa-body">' +
        ico('danger-warning', 24) + '<span class="fa-text"></span></span>';
      alertEl.querySelector('.fa-text').textContent = n === 0
        ? 'No recipes match these filters. Remove a few to see more.'
        : 'Only ' + n + (n === 1 ? ' recipe matches' : ' recipes match') + ' these filters.';
      wrap.appendChild(alertEl);
    }

    FILTER_SECTIONS.forEach(function (sec) {
      var values = sectionValues(sec);
      if (!values.length) return;                    /* nothing in the data to offer */
      var box = document.createElement('div');
      box.className = 'fs-section';

      var head = document.createElement('div');
      head.className = 'fs-head';
      head.innerHTML = '<span class="fs-title">' + sec.label + '</span>';
      box.appendChild(head);

      var body = document.createElement('div');
      body.className = 'fs-body';
      var row = document.createElement('div');
      row.className = 'chips';
      values.forEach(function (v) {
        var value = v.value || v;
        var on = (railCtx.draft[sec.key] || []).indexOf(value) !== -1;
        var chip = document.createElement('button');
        chip.className = 'chip' + (on ? ' selected' : '');
        chip.setAttribute('aria-pressed', on);
        chip.textContent = valueLabel(sec.key, value);
        chip.addEventListener('click', function () {
          toggleFilter(railCtx.draft, sec.key, value);
          renderFilterSections();
        });
        row.appendChild(chip);
      });
      body.appendChild(row);
      box.appendChild(body);
      wrap.appendChild(box);
    });

    /* Nutrition: presets, with Custom unlocking the range fields */
    var nb = document.createElement('div');
    nb.className = 'fs-section';
    var nHead = document.createElement('div');
    nHead.className = 'fs-head';
    nHead.innerHTML = '<span class="fs-title">Nutrition</span>';
    nb.appendChild(nHead);

    var nBody = document.createElement('div');
    nBody.className = 'fs-body';
    var modes = document.createElement('div');
    modes.className = 'fs-nutri-modes';
    NUTRI_MODES.forEach(function (mode) {
      var on = railCtx.draft.nutriMode === mode.value;
      var chip = document.createElement('button');
      chip.className = 'chip' + (on ? ' selected' : '');
      chip.setAttribute('aria-pressed', on);
      chip.textContent = mode.label;
      chip.addEventListener('click', function () {
        railCtx.draft.nutriMode = mode.value;
        /* a preset fills the fields; No preference clears them */
        railCtx.draft.ranges = Object.assign({}, NUTRI_PRESETS[mode.value] || {});
        renderFilterSections();
      });
      modes.appendChild(chip);
    });
    nBody.appendChild(modes);

    var grid = document.createElement('div');
    grid.className = 'fs-ranges';
    grid.style.marginTop = '12px';
    NUTRI_FIELDS.forEach(function (f) {
      var field = document.createElement('div');
      field.className = 'field';
      var opts = '<option value="">No preference</option>';
      f.bands.forEach(function (b) {
        var val = b[0] + ':' + (b[1] === null ? '' : b[1]);
        opts += '<option value="' + val + '">' + bandLabel(b) + '</option>';
      });
      field.innerHTML = '<label>' + f.label + '</label><select aria-label="' + f.label + '">' + opts + '</select>';
      var sel = field.querySelector('select');
      sel.value = (railCtx.draft.ranges && railCtx.draft.ranges[f.key]) || '';
      sel.addEventListener('change', function () {
        railCtx.draft.ranges = railCtx.draft.ranges || {};
        if (sel.value) railCtx.draft.ranges[f.key] = sel.value;
        else delete railCtx.draft.ranges[f.key];
        /* choosing a range by hand means the selection is custom */
        var keys = Object.keys(railCtx.draft.ranges);
        railCtx.draft.nutriMode = keys.length ? 'custom' : 'none';
        renderFilterSections();
      });
      grid.appendChild(field);
    });
    nBody.appendChild(grid);
    nb.appendChild(nBody);
    wrap.appendChild(nb);

    updateApplyButton();
  }

  function updateApplyButton() {
    /* the alert carries the count, so the button just commits */
    var n = recipesFor(railCtx.draft, railCtx.q).length;
    var btn = document.getElementById('filterApplyBtn');
    btn.textContent = 'Apply';
    btn.disabled = n === 0;
  }

  function openFilterPanel() {
    railCtx.draft = {
      collectionOnly: !!railCtx.filters.collectionOnly,
      mealtime: railCtx.filters.mealtime.slice(),
      appliance: (railCtx.filters.appliance || []).slice(),
      mealType: railCtx.filters.mealType.slice(),
      proteins: railCtx.filters.proteins.slice(),
      nutriMode: railCtx.filters.nutriMode || 'none',
      ranges: Object.assign({}, railCtx.filters.ranges || {})
    };
    railCtx.mode = 'filter';
    renderRecipeRail();
  }

  /* --- Results: suggested cards (few) vs compact rows (many) --- */
  function bigCard(r) {
    var card = document.createElement('button');
    card.className = 'recipe-card';
    card.innerHTML =
      imgTag('span', 'r-img', r, '<span class="card-scrim"></span>') +
      '<span class="r-content">' +
        '<span class="r-title"></span>' + metaRow(r) +
        '<span class="r-bottom"><span class="tag-green">' + r.tag + '</span>' +
        '<span class="r-info" title="Recipe details" role="button" tabindex="0" aria-label="Recipe details">' + IC_NUTR + '</span></span>' +
      '</span>';
    card.querySelector('.r-title').textContent = r.name;
    card.querySelector('.r-info').addEventListener('click', function (e) {
      e.stopPropagation();
      openRecipeInfo(r.id, 'select');
    });
    card.addEventListener('click', function () { pickRecipe(r.id); });
    return card;
  }

  function listRow(r) {
    var row = document.createElement('button');
    row.className = 'list-row';
    row.innerHTML =
      imgTag('span', 'lr-img', r) +
      '<span class="lr-content"><span class="lr-name"></span>' +
      '<span class="lr-meta">' + r.mins + ' mins · ' + r.ing + ' ingredients</span></span>' +
      '<span class="lr-info" title="Recipe details" role="button" tabindex="0" aria-label="Recipe details">' + IC_NUTR + '</span>';
    row.querySelector('.lr-name').textContent = r.name;
    row.querySelector('.lr-info').addEventListener('click', function (e) {
      e.stopPropagation();
      openRecipeInfo(r.id, 'select');
    });
    row.addEventListener('click', function () { pickRecipe(r.id); });
    return row;
  }

  var SUGGESTED_CAP = 5;

  /* The tag the "More ..." link will apply */
  function moreTag() {
    return railCtx.dish === 'Side' ? 'side' : MEALS[railCtx.row].name.toLowerCase();
  }
  /* Smart list: fits the slot, favourites and previously-used surface first */
  function suggestedRecipes() {
    var tag = moreTag();
    var banned = excludedIngredientNames();
    return RECIPES
      /* a smart list has to honour the plan's own preferences */
      .filter(function (r) { return r.mealtime.indexOf(tag) !== -1 && recipeAllowed(r, banned); })
      .slice()
      .sort(function (a, b) {
        var inCollection = collectionRecipeIds();
        var score = function (r) {
          return (r.favorite ? 0 : 1) + (inCollection.indexOf(r.id) !== -1 ? 0 : 1);
        };
        return score(a) - score(b) || a.name.localeCompare(b.name);
      })
      .slice(0, SUGGESTED_CAP);
  }

  function renderResults() {
    /* Default state: no search and no filters means suggestions */
    var suggestedMode = !railCtx.q && !hasActiveFilters();
    var wrap = document.getElementById('recipeResults');
    wrap.innerHTML = '';

    /* Suggested is its own smart list: no chips, no result count */
    document.getElementById('countRow').classList.toggle('hidden', suggestedMode);
    if (suggestedMode) {
      var chipWrap = document.getElementById('filterChips');
      chipWrap.innerHTML = '';
      chipWrap.classList.add('hidden');
      var suggestions = suggestedRecipes();
      var box = document.createElement('div');
      box.className = 'rr-suggested';
      var head = document.createElement('div');
      head.className = 'rr-section';
      head.textContent = 'Suggested recipes';
      box.appendChild(head);
      suggestions.forEach(function (r) { box.appendChild(bigCard(r)); });
      var link = document.createElement('button');
      link.className = 'rr-link';
      link.textContent = 'More ' + moreTag() + ' recipes';
      link.addEventListener('click', function () {
        railCtx.filters.mealtime = [moreTag()];   /* context becomes an explicit filter */
        renderResults();
      });
      box.appendChild(link);
      wrap.appendChild(box);
      return;
    }

    var results = filteredRecipes();
    renderControls(results);

    if (!results.length) {
      var nm = document.createElement('div');
      nm.className = 'no-match';
      var title, sub, action, onAction;

      if (railCtx.filters.collectionOnly) {
        /* the toggle is the likely cause, so the way out is to turn it off */
        var empty = !collectionRecipeIds().length;
        title = empty ? 'Nothing in the recipe collection yet' : 'No matches in the recipe collection';
        sub = empty
          ? 'Recipes added to this client\u2019s meal plans appear here'
          : 'Try browsing all recipes instead';
        action = 'Browse all recipes';
        onAction = function () {
          railCtx.filters.collectionOnly = false;
          syncCollectionBtn();
          renderResults();
        };
      } else {
        title = 'No recipes found';
        sub = 'Try a different search term';
        action = railCtx.q ? 'Clear search' : 'Clear filters';
        onAction = clearSearchAndFilters;
      }

      nm.innerHTML =
        '<div style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">' +
          '<span class="nm-title"></span><span class="nm-sub"></span>' +
        '</div>';
      nm.querySelector('.nm-title').textContent = title;
      nm.querySelector('.nm-sub').textContent = sub;
      var btn = document.createElement('button');
      btn.className = 'btn-alt-small';
      btn.textContent = action;
      btn.addEventListener('click', onAction);
      nm.appendChild(btn);
      wrap.appendChild(nm);
      return;
    }

    results.forEach(function (r) { wrap.appendChild(listRow(r)); });
  }

  function clearSearchAndFilters() {
    railCtx.q = '';
    recipeSearch.value = '';
    railCtx.filters = emptyFilters();
    syncCollectionBtn();
    renderRecipeRail();
  }

  /* --- Swap: occurrences across the whole meal plan --- */
  function findOccurrences(recipeId) {
    var out = [];
    DAYS.forEach(function (day) {
      MEALS.forEach(function (meal, ri) {
        (cellItems[cellKey(day, ri)] || []).forEach(function (it, idx) {
          if (it.recipeId === recipeId) out.push({ day: day, row: ri, idx: idx, dish: it.dish });
        });
      });
    });
    return out;
  }
  function slotLabel(o) { return o.day + ' \u00b7 ' + MEALS[o.row].name + ' \u00b7 ' + o.dish; }

  var swapCtx = null;   /* { day, row, idx, dish, oldId, newId, occurrences, scope } */
  var swapModal = document.getElementById('swapModal');

  function applySwap(newId, targets) {
    var touchedDays = {};
    targets.forEach(function (o) {
      var list = cellItems[cellKey(o.day, o.row)];
      if (list && list[o.idx]) list[o.idx].recipeId = newId;
      renderCell(o.day, o.row);
      touchedDays[o.day] = true;
    });
    Object.keys(touchedDays).forEach(updateDayTotals);
  }

  function renderSwapScope() {
    var wrap = document.getElementById('swapScope');
    wrap.innerHTML = '';
    var here = { day: swapCtx.day, row: swapCtx.row, idx: swapCtx.idx, dish: swapCtx.dish };
    [
      { key: 'one', title: 'This recipe only', sub: slotLabel(here) },
      { key: 'all', title: 'All occurrences of this recipe', sub: swapCtx.occurrences.length + ' in this meal plan' }
    ].forEach(function (o) {
      var row = document.createElement('button');
      row.className = 'radio-row' + (swapCtx.scope === o.key ? ' on' : '');
      row.setAttribute('role', 'radio');
      row.setAttribute('aria-checked', swapCtx.scope === o.key);
      row.innerHTML =
        '<span class="r-icon">' + (swapCtx.scope === o.key ? RADIO_ON : RADIO_OFF) + '</span>' +
        '<span class="r-content"><span class="r-title">' + o.title + '</span>' +
        '<span class="r-sub">' + o.sub + '</span></span>';
      row.addEventListener('click', function () { swapCtx.scope = o.key; renderSwapScope(); });
      wrap.appendChild(row);
      /* Naming the slots keeps "apply to all" from being a blind action */
      if (o.key === 'all' && swapCtx.scope === 'all') {
        var ul = document.createElement('ul');
        ul.className = 'occ-list';
        swapCtx.occurrences.forEach(function (occ) {
          var li = document.createElement('li');
          li.textContent = slotLabel(occ);
          ul.appendChild(li);
        });
        wrap.appendChild(ul);
      }
    });
  }

  function openSwapModal() {
    document.getElementById('swapNewName').textContent = recipeById(swapCtx.newId).name;
    document.getElementById('swapOldName').textContent = recipeById(swapCtx.oldId).name;
    renderSwapScope();
    swapModal.classList.remove('hidden');
    document.getElementById('swapConfirmBtn').focus();
  }
  function closeSwapModal() {
    swapModal.classList.add('hidden');
    swapCtx = null;
  }
  document.getElementById('swapCancelBtn').addEventListener('click', closeSwapModal);
  swapModal.addEventListener('click', function (e) { if (e.target === swapModal) closeSwapModal(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !swapModal.classList.contains('hidden')) closeSwapModal();
  });
  document.getElementById('swapConfirmBtn').addEventListener('click', function () {
    var targets = swapCtx.scope === 'all'
      ? swapCtx.occurrences
      : [{ day: swapCtx.day, row: swapCtx.row, idx: swapCtx.idx }];
    var count = targets.length;
    applySwap(swapCtx.newId, targets);
    closeSwapModal();
    railCtx.mode = 'details';
    railCtx.targetIdx = null;
    renderRecipeRail();
    showToast(count > 1 ? 'Recipe swapped in ' + count + ' meals' : 'Recipe swapped');
  });

  function pickRecipe(id) {
    touchActivePlan();
    var key = cellKey(railCtx.day, railCtx.row);
    var items = cellItems[key] = (cellItems[key] || []);
    if (railCtx.targetIdx !== null && items[railCtx.targetIdx]) {
      var target = items[railCtx.targetIdx];
      var oldId = target.recipeId;
      if (oldId === id) {                      /* picked the same recipe: nothing to swap */
        railCtx.targetIdx = null;
        railCtx.mode = 'details';
        renderRecipeRail();
        return;
      }
      var occurrences = findOccurrences(oldId);
      if (occurrences.length > 1) {            /* only ask when the choice is real */
        swapCtx = {
          day: railCtx.day, row: railCtx.row, idx: railCtx.targetIdx, dish: target.dish,
          oldId: oldId, newId: id, occurrences: occurrences, scope: 'one'
        };
        openSwapModal();
        return;
      }
      target.recipeId = id;
      showToast('Recipe swapped');
    } else if (findDish(items, railCtx.dish)) {
      railCtx.mode = 'details';
      renderRecipeRail();
      return;
    } else {
      items.push({ recipeId: id, dish: railCtx.dish, servings: 1, portions: 1, leftover: false });
      showToast('Recipe added');
    }
    railCtx.targetIdx = null;
    railCtx.mode = 'details';
    renderCell(railCtx.day, railCtx.row);
    updateDayTotals(railCtx.day);
    renderRecipeRail();
  }

  function qtyHtml(label, cls, value) {
    return '<div class="qty"><label>' + label + '</label><div class="q-field">' +
      '<span class="q-val ' + cls + '-val">' + value + '</span>' +
      '<button class="q-btn ' + cls + '-minus" aria-label="Decrease ' + label.toLowerCase() + '">' + IC_MINUS + '</button>' +
      '<button class="q-btn ' + cls + '-plus" aria-label="Increase ' + label.toLowerCase() + '">' + IC_PLUS + '</button>' +
      '</div></div>';
  }

  function renderDetails() {
    var items = itemsFor();
    var hasMain = !!findDish(items, 'Main');
    var hasSide = !!findDish(items, 'Side');
    document.getElementById('stepperDay').textContent = railCtx.day;
    document.getElementById('addMainBtn').classList.toggle('hidden', hasMain);
    document.getElementById('addSideBtn').classList.toggle('hidden', hasSide);
    var dayIdx = DAYS.indexOf(railCtx.day);
    document.getElementById('dayPrevBtn').classList.toggle('disabled', dayIdx === 0);
    document.getElementById('dayNextBtn').classList.toggle('disabled', dayIdx === DAYS.length - 1);

    var wrap = document.getElementById('detailCards');
    wrap.innerHTML = '';
    var ordered = items.map(function (it, idx) { return { it: it, idx: idx }; })
      .sort(function (a, b) { return (a.it.dish === 'Main' ? 0 : 1) - (b.it.dish === 'Main' ? 0 : 1); });
    ordered.forEach(function (entry) {
      var it = entry.it, idx = entry.idx;
      var r = recipeById(it.recipeId);
      var el = document.createElement('div');
      el.className = 'prc';
      el.innerHTML =
        imgTag('div', 'prc-img', r) +
        '<div class="prc-body">' +
          '<div class="prc-actions"><span class="tag-dish' + (it.dish === 'Side' ? ' side' : '') + '">' + it.dish + '</span><span class="prc-btns">' +
            '<button class="swap tip" data-tip="Swap recipe" aria-label="Swap recipe">' + IC_SWAP + '</button>' +
            '<button class="nutr tip" data-tip="Recipe details" aria-label="Recipe details">' + IC_NUTR + '</button>' +
            '<button class="del tip tip-end" data-tip="Remove recipe" aria-label="Remove recipe">' + IC_TRASH + '</button></span></div>' +
          '<div class="r-title prc-name"></div>' + metaRow(r) +
          '<div class="qty-row">' + qtyHtml('Servings to cook', 'srv', it.servings) + qtyHtml('Portions to eat', 'prt', it.portions) + '</div>' +
          '<button class="lo-row" role="checkbox" aria-checked="' + it.leftover + '"><span class="lo-icon">' + (it.leftover ? CBX_ON : CBX_OFF) + '</span><span class="lo-label">Mark as leftover</span></button>' +
        '</div>';
      el.querySelector('.prc-name').textContent = r.name;

      el.querySelector('.swap').addEventListener('click', function () {
        railCtx.mode = 'select'; railCtx.targetIdx = idx; railCtx.dish = it.dish;
        resetSelector();
        renderRecipeRail();
        recipeSearch.focus();
      });
      el.querySelector('.nutr').addEventListener('click', function () {
        openRecipeInfo(it.recipeId, 'details');
      });
      el.querySelector('.del').addEventListener('click', function () {
        var list = itemsFor();
        list.splice(idx, 1);
        renderCell(railCtx.day, railCtx.row);
        updateDayTotals(railCtx.day);
        showToast('Recipe removed');
        if (!list.length) { railCtx.mode = 'select'; railCtx.dish = 'Main'; }
        renderRecipeRail();
      });
      function bump(field, valCls, delta) {
        it[field] = Math.max(1, it[field] + delta);
        el.querySelector('.' + valCls).textContent = it[field];
        if (field === 'portions') { renderCell(railCtx.day, railCtx.row); updateDayTotals(railCtx.day); }
      }
      el.querySelector('.srv-minus').addEventListener('click', function () { bump('servings', 'srv-val', -1); });
      el.querySelector('.srv-plus').addEventListener('click', function () { bump('servings', 'srv-val', 1); });
      el.querySelector('.prt-minus').addEventListener('click', function () { bump('portions', 'prt-val', -1); });
      el.querySelector('.prt-plus').addEventListener('click', function () { bump('portions', 'prt-val', 1); });
      var lo = el.querySelector('.lo-row');
      lo.addEventListener('click', function () {
        it.leftover = !it.leftover;
        lo.setAttribute('aria-checked', it.leftover);
        lo.querySelector('.lo-icon').innerHTML = it.leftover ? CBX_ON : CBX_OFF;
        renderCell(railCtx.day, railCtx.row);
      });
      wrap.appendChild(el);
    });
  }

  recipeSearch.addEventListener('input', function () {
    railCtx.q = recipeSearch.value;
    renderResults();
  });
  document.getElementById('clearFiltersBtn').addEventListener('click', clearSearchAndFilters);

  var collectionBtn = document.getElementById('collectionBtn');
  function syncCollectionBtn() {
    collectionBtn.setAttribute('aria-pressed', !!railCtx.filters.collectionOnly);
  }
  collectionBtn.addEventListener('click', function () {
    railCtx.filters.collectionOnly = !railCtx.filters.collectionOnly;
    syncCollectionBtn();
    renderResults();
  });

  document.getElementById('filterBtn').addEventListener('click', openFilterPanel);
  document.getElementById('filterCancelBtn').addEventListener('click', function () {
    railCtx.draft = null;
    railCtx.mode = 'select';
    renderRecipeRail();
  });
  document.getElementById('filterApplyBtn').addEventListener('click', function () {
    railCtx.draft.collectionOnly = railCtx.filters.collectionOnly;   /* the toggle lives outside the panel */
    railCtx.filters = railCtx.draft;
    railCtx.draft = null;
    railCtx.mode = 'select';
    renderRecipeRail();
  });

  recipeBackBtn.addEventListener('click', function () {
    if (railCtx.mode === 'info') {
      if (!railCtx.infoFrom) return;     /* nothing to go back to */
      railCtx.mode = railCtx.infoFrom;   /* back to the selector or the meal details */
      renderRecipeRail();
      return;
    }
    railCtx.mode = 'details';
    railCtx.targetIdx = null;
    renderRecipeRail();
  });
  document.getElementById('recipeCloseBtn').addEventListener('click', function () {
    popPanel(recipeRail);
    setSelectedCell(null);
  });
  function resetSelector() {
    /* Slot context drives the smart suggested list, not visible filters */
    railCtx.q = '';
    recipeSearch.value = '';
    railCtx.filters = emptyFilters();
    if (typeof syncCollectionBtn === 'function') syncCollectionBtn();
  }
  function openSelectorFor(dish) {
    railCtx.mode = 'select'; railCtx.dish = dish; railCtx.targetIdx = null;
    resetSelector();
    renderRecipeRail();
    recipeSearch.focus();
  }
  document.getElementById('addSideBtn').addEventListener('click', function () { openSelectorFor('Side'); });
  document.getElementById('addMainBtn').addEventListener('click', function () { openSelectorFor('Main'); });
  document.getElementById('dayPrevBtn').addEventListener('click', function () { stepDay(-1); });
  document.getElementById('dayNextBtn').addEventListener('click', function () { stepDay(1); });
  function stepDay(delta) {
    var idx = DAYS.indexOf(railCtx.day) + delta;
    if (idx < 0 || idx >= DAYS.length) return;
    railCtx.day = DAYS[idx];
    railCtx.targetIdx = null;
    railCtx.dish = 'Main';
    railCtx.mode = itemsFor().length ? 'details' : 'select';
    resetSelector();
    setSelectedCell(railCtx.day, railCtx.row);
    renderRecipeRail();
  }

  /* ===== Nutrition summary for a day ===== */
  var nutriRail = document.getElementById('nutriRail');
  var nsDay = DAYS[0];

  /* Sum every portion planned for the day */
  function dayTotals(day) {
    var t = { kcal: 0, carbs: 0, fat: 0, protein: 0, fiber: 0, sugar: 0,
              cholesterol: 0, sodium: 0, vitaminA: 0, vitaminC: 0, calcium: 0, iron: 0 };
    var meals = 0;
    MEALS.forEach(function (meal, ri) {
      var items = cellItems[cellKey(day, ri)] || [];
      if (items.length) meals++;
      items.forEach(function (it) {
        var r = recipeById(it.recipeId);
        if (!r) return;
        var m = macrosOf(r);
        Object.keys(t).forEach(function (k) { t[k] += m[k] * it.portions; });
      });
    });
    t.iron = Math.round(t.iron * 10) / 10;
    return { totals: t, meals: meals };
  }

  function clearActiveDay() {
    DAYS.forEach(function (d2) {
      if (dayEls[d2] && dayEls[d2].el) dayEls[d2].el.classList.remove('active');
    });
  }

  function markActiveDay(day) {
    var on = !nutriRail.classList.contains('hidden-panel');
    DAYS.forEach(function (d2) {
      if (dayEls[d2] && dayEls[d2].el) dayEls[d2].el.classList.toggle('active', d2 === day && on);
    });
    /* selecting a day supersedes whatever meal cell was selected */
    if (on) Object.keys(cellEls).forEach(function (k) { cellEls[k].classList.remove('selected'); });
  }

  function renderNutriRail() {
    document.getElementById('nsDayName').textContent = nsDay;
    var idx = DAYS.indexOf(nsDay);
    document.getElementById('nsDayPrev').classList.toggle('disabled', idx === 0);
    document.getElementById('nsDayNext').classList.toggle('disabled', idx === DAYS.length - 1);

    var res = dayTotals(nsDay), t = res.totals;

    var kc = { carbs: t.carbs * 4, fat: t.fat * 9, protein: t.protein * 4 };
    var macroKcal = kc.carbs + kc.fat + kc.protein;
    var share = function (k) { return macroKcal ? Math.round((kc[k] / macroKcal) * 100) : 0; };
    var fmtN = function (v) { return Math.round(v).toLocaleString('en-US'); };
    var hasTarget = savedPrefs.targetOn;

    /* Macro split donut: conic slices, one per macro's share of the day's macro
       calories, running clockwise from 12 o'clock as Fat → Protein → Carbs.
       Hairline white gaps separate the slices, as in the design. */
    var pctCarbs = share('carbs'), pctFat = share('fat'), pctProtein = share('protein');
    var donut = document.getElementById('msDonut');
    if (macroKcal) {
      var stops = [], at = 0;
      [[pctFat, 'var(--creamsicle200)'], [pctProtein, 'var(--spring400)'], [pctCarbs, 'var(--lake600)']]
        .forEach(function (seg) {
          if (!seg[0]) return;
          stops.push(seg[1] + ' ' + at + '% ' + (at + seg[0]) + '%');
          at += seg[0];
        });
      donut.style.background = 'conic-gradient(' + stops.join(', ') + ')';
    } else {
      donut.style.background = 'var(--n200)';
    }
    document.getElementById('msLegend').innerHTML = [
      ['Carbs', pctCarbs, 'var(--lake600)'],
      ['Fat', pctFat, 'var(--creamsicle200)'],
      ['Protein', pctProtein, 'var(--spring400)']
    ].map(function (row) {
      return '<div class="ms-leg-row"><span class="ms-swatch" style="color:' + row[2] + ';">' + ico('pie-chart', 16) + '</span>' +
        '<span class="ms-label">' + row[0] + '</span><span class="ms-pct">' + row[1] + '%</span></div>';
    }).join('');

    /* Metric widgets: Calories / Carbs / Fat / Protein, each against its own target
       when one is set. Over-target reads as a warning; hitting it exactly reads as success. */
    var metrics = [
      { key: 'kcal', label: 'Calories', value: t.kcal, target: savedPrefs.calories, unit: 'kcal', color: 'var(--n600)' },
      { key: 'carbs', label: 'Carbs', value: t.carbs, target: savedPrefs.grams.carbs, unit: 'g', color: 'var(--lake600)' },
      { key: 'fat', label: 'Fat', value: t.fat, target: savedPrefs.grams.fat, unit: 'g', color: 'var(--creamsicle200)' },
      { key: 'protein', label: 'Protein', value: t.protein, target: savedPrefs.grams.protein, unit: 'g', color: 'var(--spring400)' }
    ];
    document.getElementById('metricGrid').innerHTML = metrics.map(function (m) {
      var value = fmtN(m.value);
      if (!hasTarget) {
        return '<div class="metric-card">' +
          '<div class="metric-head"><span class="metric-name">' + m.label + '</span></div>' +
          '<div class="metric-value-row"><span class="metric-value">' + value + '</span><span class="metric-unit">' + m.unit + '</span></div>' +
          '</div>';
      }
      var pct = m.target ? m.value / m.target : 0;
      var over = pct > 1;
      var met = pct >= 1;
      var fillPct = Math.min(pct, 1) * 100;
      var tag = met
        ? '<span class="metric-tag ' + (over ? 'warning' : 'success') + '">' + ico(over ? 'danger-warning' : 'done', 14) + '</span>'
        : '';
      var desc = over ? 'Over target' : (met ? 'Target met' : Math.round(pct * 100) + '%');
      return '<div class="metric-card">' +
        '<div class="metric-head"><span class="metric-name">' + m.label + '</span>' + tag + '</div>' +
        '<div class="metric-value-row">' +
          '<span class="metric-value' + (over ? ' warning' : '') + '">' + value + '</span>' +
          '<span class="metric-sep">/</span>' +
          '<span class="metric-target">' + fmtN(m.target) + '</span>' +
          '<span class="metric-unit">' + m.unit + '</span>' +
        '</div>' +
        '<div class="metric-bar-wrap">' +
          '<div class="metric-bar-fill" style="width:' + fillPct + '%; background:' + m.color + ';"></div>' +
          (met ? '<div class="metric-marker" style="left:' + fillPct + '%;"></div>' : '') +
        '</div>' +
        '<div class="metric-desc' + (over ? ' warning' : '') + '">' + desc + '</div>' +
        '</div>';
    }).join('');

    var rows = [
      { label: 'Fiber', text: fmtN(t.fiber) + ' g' },
      { label: 'Sugar', text: fmtN(t.sugar) + ' g' },
      { label: 'Cholesterol', text: fmtN(t.cholesterol) + ' mg' },
      { label: 'Sodium', text: fmtN(t.sodium) + ' mg' },
      { label: 'Vitamin A', text: fmtN(t.vitaminA) + ' iu' },
      { label: 'Vitamin C', text: fmtN(t.vitaminC) + ' mg' },
      { label: 'Calcium', text: fmtN(t.calcium) + ' mg' },
      { label: 'Iron', text: t.iron + ' mg' }
    ];
    var wrap = document.getElementById('nsRows');
    wrap.innerHTML = '';
    rows.forEach(function (row) {
      var el = document.createElement('div');
      el.className = 'ns-row';
      el.innerHTML = '<span class="ns-label">' + row.label + '</span>' +
        '<span class="ns-chip' + (row.chip ? ' ' + row.chip : '') + '">' + row.text + '</span>';
      wrap.appendChild(el);
    });
    markActiveDay(nsDay);
  }

  function openNutriRail(day) {
    nsDay = day;
    pushPanel(nutriRail);
    renderNutriRail();
  }

  document.getElementById('nutriCloseBtn').addEventListener('click', function () {
    popPanel(nutriRail);
    clearActiveDay();
  });
  document.getElementById('nsDayPrev').addEventListener('click', function () {
    var i = DAYS.indexOf(nsDay); if (i > 0) { nsDay = DAYS[i - 1]; renderNutriRail(); }
  });
  document.getElementById('nsDayNext').addEventListener('click', function () {
    var i = DAYS.indexOf(nsDay); if (i < DAYS.length - 1) { nsDay = DAYS[i + 1]; renderNutriRail(); }
  });
  document.getElementById('nsToggle').addEventListener('click', function () {
    var card = document.getElementById('nsCard');
    var collapsed = card.classList.toggle('collapsed');
    this.setAttribute('aria-expanded', !collapsed);
  });

  /* ===== Auto-fill: build the week from the saved preferences ===== */

  /* Expand saved exclusions into ingredient names, so a group exclusion
     ("Gluten") catches every ingredient tagged into it. */
  function excludedIngredientNamesFor(keys) {
    var names = [];
    keys.forEach(function (key) {
      if (key.indexOf('I:') === 0) {
        names.push(key.slice(2).toLowerCase());
      } else {
        var label = key.slice(2);
        var grp = EXCL_GRP.filter(function (g) { return g.l === label; })[0];
        if (grp) grp.m.forEach(function (idx) { names.push(EXCL_ING[idx].toLowerCase()); });
      }
    });
    return names;
  }
  function excludedIngredientNames() { return excludedIngredientNamesFor(savedPrefs.exclusions); }

  /* Ingredient names rarely match the master list exactly ("Greek Yogurt" vs
     "Plain Greek Yogurt"), so match on whole words in either direction. Erring
     toward over-excluding is the safe direction for an exclusion. */
  function nameMatches(a, b) {
    if (a === b) return true;
    var bounded = function (needle, hay) {
      var esc = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp('(^|[^a-z])' + esc + '($|[^a-z])').test(hay);
    };
    if (b.length >= 4 && bounded(b, a)) return true;
    if (a.length >= 4 && bounded(a, b)) return true;
    return false;
  }

  function recipeAllowed(r, banned) {
    var det = RECIPE_DETAILS[r.id] || { diet: [], ing: [] };
    /* every selected diet must apply, matching the panel's promise */
    var okDiet = savedPrefs.dietary.every(function (dietName) {
      return det.diet.indexOf(dietName) !== -1;
    });
    if (!okDiet) return false;
    /* substring match errs toward over-excluding, which is the safe direction */
    /* No ingredient data means the exclusions can't be verified, so don't risk it */
    if (banned.length && !det.ing.length) return false;
    var hasBanned = det.ing.some(function (entry) {
      var name = entry.split('|')[0].toLowerCase();
      return banned.some(function (b) { return nameMatches(name, b); });
    });
    return !hasBanned;
  }

  function shuffle(arr) {                 /* Fisher-Yates */
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  var SIDE_CHANCE = 0.6;

  /* Side-tagged recipes. The savoury side-only ones (broccoli, salad, wedges) carry no
     meal tag of their own, so allow them alongside lunch and dinner. */
  function sideCandidates(mealName, banned) {
    var m = mealName.toLowerCase();
    var savouryMeal = (m === 'lunch' || m === 'dinner');
    return RECIPES.filter(function (r) {
      if (r.mealtime.indexOf('side') === -1) return false;
      if (!recipeAllowed(r, banned)) return false;
      if (r.mealtime.indexOf(m) !== -1) return true;
      return savouryMeal && r.mealtime.length === 1;
    });
  }

  function autoFillPlan() {
    touchActivePlan();
    var banned = excludedIngredientNames();
    var filled = 0, skipped = 0, sides = 0, leftovers = 0;

    MEALS.forEach(function (meal, ri) {
      /* 1. eligible recipes for this mealtime, honouring the saved preferences */
      var eligible = RECIPES.filter(function (r) {
        return r.mealtime.indexOf(meal.name.toLowerCase()) !== -1 && recipeAllowed(r, banned);
      });
      /* 2. shuffle */
      var pool = shuffle(eligible);
      var sidePool = shuffle(sideCandidates(meal.name, banned));
      if (sidePool.length < 2) sidePool = pool;      /* fall back to the same list */

      /* a repeat within the same meal row later in the week is a leftover */
      var seenMain = {}, seenSide = {};

      /* 3. main per card, plus a side 60% of the time */
      DAYS.forEach(function (day, i) {
        if ((cellItems[cellKey(day, ri)] || []).length) return;
        if (!pool.length) { skipped++; return; }

        var main = pool[i % pool.length];
        var isLeftover = !!seenMain[main.id];
        seenMain[main.id] = true;
        if (isLeftover) leftovers++;
        var items = [{ recipeId: main.id, dish: 'Main', servings: 1, portions: 1, leftover: isLeftover }];

        if (Math.random() < SIDE_CHANCE && sidePool.length > 1) {
          var offset = 1 + Math.floor(Math.random() * (sidePool.length - 1));
          var side = sidePool[(i + offset) % sidePool.length];
          if (side.id !== main.id) {
            var sideLeft = !!seenSide[side.id];
            seenSide[side.id] = true;
            if (sideLeft) leftovers++;
            items.push({ recipeId: side.id, dish: 'Side', servings: 1, portions: 1, leftover: sideLeft });
            sides++;
          }
        }

        cellItems[cellKey(day, ri)] = items;
        renderCell(day, ri);
        filled++;
      });
    });
    DAYS.forEach(updateDayTotals);

    if (!filled && !skipped) showToast('Every meal is already filled');
    else if (skipped) showToast('Filled ' + filled + ' meals \u00b7 ' + skipped + ' had no matching recipe');
    else showToast('Filled ' + filled + ' meals \u00b7 ' + sides + ' with a side');
  }

  /* Template thumbnails reuse the recipe photos already inlined for the planner */
  document.querySelectorAll('.tcard-images[data-recipes]').forEach(function (wrap) {
    wrap.dataset.recipes.split(',').forEach(function (id) {
      var tile = document.createElement('div');
      tile.className = 'tile';
      var u = RECIPE_IMG[id.trim()];
      if (u) tile.style.backgroundImage = 'url(' + u + ')';
      else tile.classList.add('no-img'), tile.innerHTML = IC_NOIMG;
      wrap.appendChild(tile);
    });
    var scrim = document.createElement('span');
    scrim.className = 'card-scrim';
    wrap.appendChild(scrim);
  });

  /* ===== AI panel: suggested prompts that actually do the work ===== */
  var IC_SPARK_SM = ico('ai', 16);
  var clientRail = document.getElementById('clientRail');
  var aiThread = document.getElementById('aiThread');
  var aiIntro = document.getElementById('aiIntro');
  var aiInput = document.getElementById('aiInput');

  /* Adds a side to any dinner that has a main but no side */
  function addSideToDinners() {
    var ri = -1;
    MEALS.forEach(function (m, i) { if (m.name === 'Dinner') ri = i; });
    if (ri === -1) return 0;
    var banned = excludedIngredientNames();
    var pool = sideCandidates('Dinner', banned);
    if (!pool.length) return 0;
    var added = 0;
    DAYS.forEach(function (day, i) {
      var items = cellItems[cellKey(day, ri)];
      if (!items || !items.length) return;
      if (findDish(items, 'Side')) return;
      var main = findDish(items, 'Main');
      var choice = pool[i % pool.length];
      if (main && choice.id === main.recipeId) choice = pool[(i + 1) % pool.length];
      items.push({ recipeId: choice.id, dish: 'Side', servings: 1, portions: 1, leftover: false });
      renderCell(day, ri);
      updateDayTotals(day);
      added++;
    });
    return added;
  }

  /* What a client's records would yield. Chosen to be plausible and to leave
     enough matching recipes to actually fill a week. */
  var DETECTED = {
    diets: ['Vegetarian'],
    exclusions: ['Gluten', 'Dairy'],
    cultural: ['middle eastern'],
    calories: JOURNAL_TARGET.calories,
    sources: ['intake form', 'Diet & Lifestyle', 'journal targets']
  };

  var IC_SPIN = '<svg class="st-icon spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 4a8 8 0 0 1 8 8" opacity=".9"/><circle cx="12" cy="12" r="8" opacity=".18"/></svg>';
  var IC_TICK = ico('done', 16);

  function aiSteps() {
    var wrap = document.createElement('div');
    wrap.className = 'ai-steps';
    aiThread.appendChild(wrap);
    return wrap;
  }
  function aiStep(wrap, text) {
    var el = document.createElement('div');
    el.className = 'ai-step';
    el.innerHTML = IC_SPIN + '<span></span>';
    el.querySelector('span').textContent = text;
    wrap.appendChild(el);
    var body = aiThread.parentElement;
    body.scrollTop = body.scrollHeight;
    return el;
  }
  function aiStepDone(el, text) {
    el.className = 'ai-step done';
    el.innerHTML = IC_TICK + '<span></span>';
    el.querySelector('span').textContent = text;
  }
  /* run a list of [label, doneLabel] steps in sequence, then call after() */
  function runSteps(list, after) {
    var wrap = aiSteps();
    var i = 0;
    (function next() {
      if (i >= list.length) { if (after) after(); return; }
      var el = aiStep(wrap, list[i][0]);
      setTimeout(function () {
        aiStepDone(el, list[i][1]);
        i++;
        next();
      }, 650);
    })();
  }

  /* Write the detected preferences into the panel and commit them, so the header
     reflects them and the practitioner can edit them by hand afterwards. */
  function applyDetectedPrefs() {
    document.querySelectorAll('#dietaryChips .chip').forEach(function (c) {
      c.classList.toggle('selected', DETECTED.diets.indexOf(c.dataset.value) !== -1);
    });
    document.querySelectorAll('#culturalChips .chip').forEach(function (c) {
      c.classList.toggle('selected', DETECTED.cultural.indexOf(c.dataset.value) !== -1);
    });
    exclSelected = new Set(DETECTED.exclusions.map(function (g) { return 'G:' + g; }));
    renderExclusionChips();

    targetToggle.classList.add('on');
    targetToggle.setAttribute('aria-checked', 'true');
    targetBody.style.display = 'flex';
    targetOffMeta.classList.add('hidden');
    syncState = true;
    applyJournalTarget();
    renderSyncState();

    commitPanel();      /* header updates, and the panel opens with these set */
  }

  function prefsAreSet() {
    return savedPrefs.dietary.length || savedPrefs.exclusions.length ||
           savedPrefs.cultural.length || savedPrefs.targetOn;
  }

  function aiConfirmCard() {
    var card = document.createElement('div');
    card.className = 'msg agent ai-confirm';
    var chips = function (list, excl) {
      return list.map(function (l) {
        return '<span class="chip selected">' + (excl ? SLASH : '') + l + '</span>';
      }).join('');
    };
    card.innerHTML =
      '<div class="cf-group"><span class="cf-label">Diets</span><span class="chips">' + chips(DETECTED.diets) + '</span></div>' +
      '<div class="cf-group"><span class="cf-label">Exclusions</span><span class="chips">' + chips(DETECTED.exclusions, true) + '</span></div>' +
      '<div class="cf-group"><span class="cf-label">Cuisine</span><span class="chips">' + chips(DETECTED.cultural) + '</span></div>' +
      '<div class="cf-group"><span class="cf-label">Daily target</span><span class="cf-value">' +
        DETECTED.calories.toLocaleString('en-US') + ' kcal, synced to the journal</span></div>' +
      '<div class="cf-actions"></div>';

    var apply = document.createElement('button');
    apply.className = 'btn btn-primary';
    apply.textContent = 'Apply and fill the week';
    var adjust = document.createElement('button');
    adjust.className = 'btn btn-secondary';
    adjust.textContent = 'Let me adjust first';

    var lock = function () { apply.disabled = true; adjust.disabled = true; };

    apply.addEventListener('click', function () {
      lock();
      applyDetectedPrefs();          /* commit them before filling */
      runSteps([
        ['Applying preferences', 'Saved ' + (DETECTED.diets.length + DETECTED.exclusions.length + DETECTED.cultural.length + 1) + ' preferences to this meal plan'],
        ['Selecting recipes for 35 meals', 'Matched recipes to every meal']
      ], function () {
        var before = countFilledCells();
        autoFillPlan();
        var n = countFilledCells() - before;
        aiMsg('agent', 'Filled ' + n + ' meals. The preferences are saved on this meal plan, so you can open Edit preferences to change any of them. Nothing is shared with your client until you review it.');
      });
    });
    adjust.addEventListener('click', function () {
      lock();
      applyDetectedPrefs();
      aiMsg('agent', 'I\u2019ve saved them so you can see them in context. Adjust anything in Meal plan details, save, then ask me to fill the week.');
      setTimeout(function () { closeAiPanel(); openDetailsPanel(); }, 700);
    });

    card.querySelector('.cf-actions').appendChild(apply);
    card.querySelector('.cf-actions').appendChild(adjust);
    aiThread.appendChild(card);
    var body = aiThread.parentElement;
    body.scrollTop = body.scrollHeight;
  }

  function fillFlow() {
    if (prefsAreSet()) {
      runSteps([
        ['Reading the preferences on this meal plan', 'Read the saved preferences'],
        ['Selecting recipes for each meal', 'Matched recipes to every meal']
      ], function () {
        var before = countFilledCells();
        autoFillPlan();
        var n = countFilledCells() - before;
        aiMsg('agent', n ? 'Filled ' + n + ' meals using the saved preferences.'
                         : 'Every meal is already filled. Tell me what to change and I can swap things out.');
      });
      return;
    }
    aiMsg('agent', 'No preferences are set on this meal plan yet, so I\u2019ll check this client\u2019s records first.');
    runSteps([
      ['Reading the intake form', 'Intake form \u2014 vegetarian, avoids gluten'],
      ['Reading Diet & Lifestyle', 'Diet & Lifestyle \u2014 avoids dairy, prefers middle eastern food'],
      ['Checking journal targets', 'Journal \u2014 1,800 kcal daily target']
    ], function () {
      aiMsg('agent', 'Here\u2019s what I found across 3 sources. Shall I apply these and build the week?');
      aiConfirmCard();
    });
  }

  var AI_SUGGESTIONS = [
    {
      label: 'Fill the week using this client\u2019s preferences',
      run: function () { fillFlow(); return null; }
    },
    {
      label: 'Change dietary preferences and exclusions',
      run: function () {
        closeAiPanel();
        openDetailsPanel();
        return 'I\u2019ve opened Meal plan details. Update the diets or exclusions there and save, then ask me to refill the week.';
      }
    },
    {
      label: 'Add a side to every dinner',
      run: function () {
        var n = addSideToDinners();
        return n ? 'Added a side to ' + n + ' dinner' + (n === 1 ? '' : 's') + '.'
                 : 'Every dinner already has a side, or there are no dinners to add to yet.';
      }
    }
  ];

  function countFilledCells() {
    var n = 0;
    DAYS.forEach(function (day) {
      MEALS.forEach(function (m, ri) { if ((cellItems[cellKey(day, ri)] || []).length) n++; });
    });
    return n;
  }

  function aiMsg(kind, text) {
    var el = document.createElement('div');
    el.className = 'msg ' + kind;
    el.textContent = text;
    aiThread.appendChild(el);
    var body = aiThread.parentElement;
    body.scrollTop = body.scrollHeight;
    return el;
  }

  function renderAiSuggestions() {
    var wrap = document.getElementById('aiSuggestions');
    wrap.innerHTML = '';
    AI_SUGGESTIONS.forEach(function (sg) {
      var btn = document.createElement('button');
      btn.className = 'ai-sugg';
      btn.innerHTML = IC_SPARK_SM + '<span>' + sg.label + '</span>';
      btn.addEventListener('click', function () { aiSend(sg.label, sg.run); });
      wrap.appendChild(btn);
    });
  }

  /* Loose keyword routing so typed requests hit the same actions as the chips */
  var AI_ROUTES = [
    { words: ['side'], idx: 2 },
    { words: ['preference', 'exclusion', 'diet', 'allerg'], idx: 1 },
    { words: ['fill', 'build', 'plan the week', 'generate'], idx: 0 }
  ];
  function routeFor(text) {
    var t = text.toLowerCase();
    for (var i = 0; i < AI_ROUTES.length; i++) {
      for (var j = 0; j < AI_ROUTES[i].words.length; j++) {
        if (t.indexOf(AI_ROUTES[i].words[j]) !== -1) return AI_SUGGESTIONS[AI_ROUTES[i].idx].run;
      }
    }
    return null;
  }

  function aiSend(text, run) {
    if (!text) return;
    aiIntro.classList.add('hidden');           /* the greeting gives way to the thread */
    aiMsg('user', text);
    aiInput.value = '';
    var action = run || routeFor(text);
    setTimeout(function () {
      if (action) {
        var reply = action();          /* null means the action posts its own messages */
        if (reply) aiMsg('agent', reply);
      } else {
        aiMsg('agent', 'I can fill the week from the saved preferences, change the preferences, or add a side to every dinner. Try one of those.');
      }
    }, 500);
  }

  function greeting() {
    var h = new Date().getHours();
    return (h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening') + ', Christina';
  }

  var aiGen = 0;
  function openAiPanel() {
    aiGen++;                                     /* invalidate any pending close */
    /* the point is to see the meal plan, so clear the right-hand panels */
    visiblePanels().forEach(function (pnl) { popPanel(pnl); });
    setSelectedCell(null);
    clientRail.classList.add('hidden');          /* the chat takes the left slot */

    document.getElementById('aiGreeting').textContent = greeting();
    renderAiSuggestions();
    aiPanel.classList.remove('hidden', 'ai-out');
    if (!reducedMotion) { void aiPanel.offsetWidth; aiPanel.classList.add('ai-in'); }
  }
  function closeAiPanel() {
    var restore = function () {
      aiPanel.classList.add('hidden');
      aiPanel.classList.remove('ai-out');
      clientRail.classList.remove('hidden');
    };
    var g = ++aiGen;
    aiPanel.classList.remove('ai-in');
    if (reducedMotion) { restore(); return; }
    void aiPanel.offsetWidth;
    aiPanel.classList.add('ai-out');
    setTimeout(function () { if (g === aiGen) restore(); }, 220);
  }

  document.getElementById('buildAiBtn').addEventListener('click', function () { guardExit(openAiPanel); });
  var defaultsIndicator = document.getElementById('defaultsIndicator');
  if (defaultsIndicator) {
    defaultsIndicator.addEventListener('click', function () { guardExit(openDefaultPreferencesPanel); });
    defaultsIndicator.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); guardExit(openDefaultPreferencesPanel); }
    });
  }
  var npSettingsBtn = document.getElementById('npSettingsBtn');
  if (npSettingsBtn) {
    npSettingsBtn.addEventListener('click', function () { guardExit(openDefaultPreferencesPanel); });
  }
  document.getElementById('aiCloseBtn').addEventListener('click', closeAiPanel);
  document.getElementById('aiBackBtn').addEventListener('click', closeAiPanel);
  document.getElementById('aiSendBtn').addEventListener('click', function () { aiSend(aiInput.value.trim()); });
  aiInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); aiSend(aiInput.value.trim()); }
  });

  /* ===== AI suggestions widget + chat handoff ===== */
  var AI_PREFS = [
    { label: "Vegan", type: "diet" },
    { label: "Low glycemic", type: "diet" },
    { label: "Asian", type: "cultural" },
    { label: "Gluten", type: "excl" },
    { label: "Almonds", type: "excl" },
    { label: "Beans", type: "excl" },
    { label: "Dairy", type: "excl" },
    { label: "Corn", type: "excl" },
    { label: "Chicken", type: "excl" },
    { label: "Eggs", type: "excl" },
    { label: "Wheat", type: "excl" },
    { label: "Processed foods", type: "excl" }
  ];

  var aiWidget = document.getElementById("aiWidget");
  var chatPanel = document.getElementById("chatPanel");
  var chatMsgs = document.getElementById("chatMsgs");
  var chatComposer = document.getElementById("chatComposer");
  var chatSeeded = false;

  function renderAiChips() {
    var wrap = document.getElementById("aiPrefChips");
    wrap.innerHTML = "";
    AI_PREFS.forEach(function (pref) {
      var chip = document.createElement("span");
      chip.className = "ai-chip";
      chip.innerHTML = (pref.type === "excl" ? SLASH : "") + pref.label +
        "<button class=\"x-btn\" aria-label=\"Remove " + pref.label + "\">" + CLOSE_X + "</button>";
      chip.querySelector(".x-btn").addEventListener("click", function () {
        AI_PREFS = AI_PREFS.filter(function (p) { return p !== pref; });
        renderAiChips();
        if (!AI_PREFS.length) aiWidget.classList.add("hidden");
      });
      wrap.appendChild(chip);
    });
  }
  renderAiChips();

  function listJoin(items) {
    if (items.length <= 1) return items.join("");
    return items.slice(0, -1).join(", ") + " and " + items[items.length - 1];
  }

  function buildPrompt() {
    var diets = AI_PREFS.filter(function (p) { return p.type === "diet"; }).map(function (p) { return p.label.toLowerCase(); });
    var cultural = AI_PREFS.filter(function (p) { return p.type === "cultural"; }).map(function (p) { return p.label; });
    var excl = AI_PREFS.filter(function (p) { return p.type === "excl"; }).map(function (p) { return p.label.toLowerCase(); });
    var parts = ["Create a 7-day meal plan for this client"];
    if (diets.length) parts.push("that follows a " + listJoin(diets) + " diet");
    if (cultural.length) parts.push("prioritizes " + listJoin(cultural) + " recipes");
    if (excl.length) parts.push("and excludes " + listJoin(excl));
    return parts.join(" ") + ".";
  }

  function addMsg(kind, text) {
    var msg = document.createElement("div");
    msg.className = "msg " + kind;
    msg.textContent = text;
    chatMsgs.appendChild(msg);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
    return msg;
  }

  function applyPrefsToPanel() {
    var dietLabels = AI_PREFS.filter(function (p) { return p.type === "diet"; }).map(function (p) { return p.label; });
    document.querySelectorAll("#dietaryChips .chip").forEach(function (chip) {
      chip.classList.toggle("selected", dietLabels.indexOf(chip.dataset.value) !== -1);
    });
    var culturalLabels = AI_PREFS.filter(function (p) { return p.type === "cultural"; }).map(function (p) { return p.label.toLowerCase(); });
    document.querySelectorAll("#culturalChips .chip").forEach(function (chip) {
      chip.classList.toggle("selected", culturalLabels.indexOf(chip.dataset.value) !== -1);
    });
    exclSelected = new Set(AI_PREFS.filter(function (p) { return p.type === "excl"; }).map(function (p) { return "G:" + p.label; }));
    renderExclusionChips();
    updateSaveButton();
  }

  document.getElementById("aiDismissBtn").addEventListener("click", function () {
    aiWidget.classList.add("hidden");
  });

  document.getElementById("aiCtaBtn").addEventListener("click", function () {
    pushPanel(chatPanel);
    if (!chatSeeded) {
      chatSeeded = true;
      addMsg("agent", "I found " + AI_PREFS.length + " preferences in this client's profile, from their intake form and Diet & Lifestyle. I've drafted a prompt below. Edit anything, then send to start the plan.");
    }
    chatComposer.value = buildPrompt();
    chatComposer.focus();
  });

  document.getElementById("chatCloseBtn").addEventListener("click", function () {
    popPanel(chatPanel);
  });

  function sendChat() {
    var text = chatComposer.value.trim();
    if (!text) return;
    addMsg("user", text);
    chatComposer.value = "";
    setTimeout(function () {
      var exclCount = AI_PREFS.filter(function (p) { return p.type === "excl"; }).length;
      var reply = addMsg("agent", "On it. I'm drafting a 7-day plan with those preferences applied" + (exclCount ? ", leaving out " + exclCount + " excluded ingredient groups" : "") + ". Nothing is shared with your client until you review it.");
      var btn = document.createElement("button");
      btn.className = "msg-btn";
      btn.textContent = "Review draft plan";
      btn.addEventListener("click", function () {
        popPanel(chatPanel);
        var plan = createPlan();
        plan.title = "Draft: 7-day plan";
        applyPrefsToPanel();
        openPlanner(plan.id, false);
      });
      reply.appendChild(btn);
      chatMsgs.scrollTop = chatMsgs.scrollHeight;
    }, 700);
  }
  document.getElementById("chatSendBtn").addEventListener("click", sendChat);
  chatComposer.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); }
  });

  /* swap markup placeholders for real library icons */
  document.querySelectorAll('[data-ico]').forEach(function (el) {
    el.outerHTML = ico(el.dataset.ico, parseInt(el.dataset.icoSize, 10));
  });
  /* icons that must keep their own id and inline style get filled in place */
  document.querySelectorAll('[data-ico-lib]').forEach(function (el) {
    el.innerHTML = ICON_LIB[el.dataset.icoLib] || '';
  });

  renderDefaultsIndicator();

  show('empty');
})();
