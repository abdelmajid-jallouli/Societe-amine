const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultTimeout(30000);

  const base = process.env.BASE_URL || 'http://localhost:49833';

  try {
    // Create a fresh account via the registration UI to ensure credentials
    const timestamp = Date.now();
    const email = `e2e+${timestamp}@example.test`;
    await page.goto(base + '/register', { waitUntil: 'networkidle2' });
    await page.type('input[formcontrolname="firstName"]', 'E2E');
    await page.type('input[formcontrolname="lastName"]', 'Tester');
    await page.type('input[formcontrolname="email"]', email);
    await page.type('input[formcontrolname="password"]', 'Password123');
    await page.click('button[type="submit"]');
    // registration redirects to /login — wait briefly and capture diagnostics if it doesn't
    try {
      await page.waitForSelector('form.login-form, input[formcontrolname="email"]', { timeout: 20000 });
    } catch (e) {
      console.error('Registration did not navigate to login; page snapshot:');
      const body = await page.content();
      console.error(body.substring(0, 2000));
      throw e;
    }

    // Now login with the created account
    await page.type('input[type="email"]', email);
    await page.type('input[type="password"]', 'Password123');
    await page.click('button[type="submit"]');
    try {
      await page.waitForFunction(() => location.pathname.includes('/home') || location.pathname === '/', { timeout: 30000 });
    } catch (e) {
      console.error('Login did not navigate to home; page snapshot:');
      const body2 = await page.content();
      console.error(body2.substring(0, 2000));
        // attempt to read any visible error-banner text
        try {
          const errText = await page.$eval('.error-banner', el => el.textContent.trim());
          console.error('Login error banner:', errText);
        } catch (ee) {
          // ignore
        }
      throw e;
    }

    // Navigate to company profile
    await page.goto(base + '/client/company-profile', { waitUntil: 'networkidle2' });

    // Fill general fields
    const set = async (name, value) => {
      const sel = `[formcontrolname="${name}"]`;
      await page.waitForSelector(sel);
      await page.evaluate((s, v) => { const el = document.querySelector(s); if (el) { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); } }, sel, value);
    };

    await set('raisonSociale', 'ACME SARL E2E');
    await set('enseigne', 'ACME Shop');
    await set('formeJuridique', 'SARL');
    await set('regime', 'Réel');
    await set('capitalSocial', '100000');
    await set('email', 'contact+e2e@acme.test');
    await set('adresse', '1 Rue de Test');
    await set('ville', 'Tunis');
    await set('telephoneFax', '+21612345678');
    await set('activite', 'Services');
    await set('observation', 'E2E automated test');
    await set('registreCommerce', 'RC-999');
    await set('matriculeFiscal', 'MF-E2E-999');
    await set('numEmployeurCnss', 'CNSS-123');
    await set('dateOuverture', '2020-01-01');
    await set('publicationJort', 'JORT-45');
    await set('codeDouane', 'CD-111');
    await set('activiteSecondaire', 'Commerce');
    await set('dateEffet', '2020-02-01');

    // Manager
    await set('nomPrenom', 'Manager E2E'); // uses the manager group's nomPrenom when inside manager group; first match will be manager

    // Tenant (formcontrol names are same, ensure we target tenant by context using nth-of-type)
    // For simplicity, fill tenant fields by locating the tenant group container
    const tenantGroup = await page.$('[formgroupname="tenantInfo"]');
    if (tenantGroup) {
      await tenantGroup.$eval('[formcontrolname="nomPrenom"]', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, 'Tenant E2E');
      await tenantGroup.$eval('[formcontrolname="debutContrat"]', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, '2021-01-01');
      await tenantGroup.$eval('[formcontrolname="montantLoyer"]', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, '1200');
    }

    // Fees
    const feesGroup = await page.$('[formgroupname="fees"]');
    if (feesGroup) {
      await feesGroup.$eval('[formcontrolname="responsableDossier"]', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, 'Responsable E2E');
      await feesGroup.$eval('[formcontrolname="montantHonoraires"]', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, '500');
      await feesGroup.$eval('[formcontrolname="dateEffet"]', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, '2022-01-01');
    }

    // Capital structure - add two entries (click the "Ajouter" within the capital panel)
    await page.$$eval('mat-expansion-panel', (panels) => {
      const p = panels.find(panel => panel.textContent && panel.textContent.includes('Répartition du capital'));
      if (!p) return;
      const btns = p.querySelectorAll('button');
      for (const b of btns) {
        if (b.textContent && b.textContent.includes('Ajouter')) {
          b.click();
        }
      }
    });
    await page.waitForTimeout(300);
    const capitalGroups = await page.$$('[formarrayname="capitalStructure"] [formgroupname]');
    if (capitalGroups.length >= 2) {
      await capitalGroups[0].$eval('[formcontrolname="nomPrenom"]', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, 'Owner One');
      await capitalGroups[0].$eval('[formcontrolname="partsPourcentage"]', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, '60');
      await capitalGroups[1].$eval('[formcontrolname="nomPrenom"]', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, 'Owner Two');
      await capitalGroups[1].$eval('[formcontrolname="partsPourcentage"]', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, '40');
    }

    // Legal documents - add two (click buttons inside the legal documents panel)
    await page.$$eval('mat-expansion-panel', (panels) => {
      const p = panels.find(panel => panel.textContent && panel.textContent.includes('Documents légaux'));
      if (!p) return;
      const btns = p.querySelectorAll('button');
      for (const b of btns) {
        if (b.textContent && b.textContent.includes('Ajouter')) {
          b.click();
        }
      }
    });
    await page.waitForTimeout(300);
    const legalGroups = await page.$$('[formarrayname="legalDocuments"] [formgroupname]');
    if (legalGroups.length >= 2) {
      // set type and status via selects by setting value and dispatching change
      await legalGroups[0].$eval('[formcontrolname="type"]', (el) => { el.value = 'STATUT'; el.dispatchEvent(new Event('change', { bubbles: true })); });
      await legalGroups[0].$eval('[formcontrolname="status"]', (el) => { el.value = 'RECEIVED'; el.dispatchEvent(new Event('change', { bubbles: true })); });
      await legalGroups[0].$eval('[formcontrolname="filePath"]', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, 'statut.pdf');

      await legalGroups[1].$eval('[formcontrolname="type"]', (el) => { el.value = 'REGISTRE_COMMERCE'; el.dispatchEvent(new Event('change', { bubbles: true })); });
      await legalGroups[1].$eval('[formcontrolname="status"]', (el) => { el.value = 'MISSING'; el.dispatchEvent(new Event('change', { bubbles: true })); });
      await legalGroups[1].$eval('[formcontrolname="filePath"]', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, '');
    }

    // Software deposits - add one (click inside the Deposits panel)
    await page.$$eval('mat-expansion-panel', (panels) => {
      const p = panels.find(panel => panel.textContent && panel.textContent.includes('Dépôts logiciels'));
      if (!p) return;
      const btns = p.querySelectorAll('button');
      for (const b of btns) {
        if (b.textContent && b.textContent.includes('Ajouter')) {
          b.click();
          break;
        }
      }
    });
    await page.waitForTimeout(300);
    const softwareGroups = await page.$$('[formarrayname="softwareDeposits"] [formgroupname]');
    if (softwareGroups.length >= 1) {
      await softwareGroups[0].$eval('[formcontrolname="label"]', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, 'App v1');
      await softwareGroups[0].$eval('[formcontrolname="date"]', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, '2023-06-01');
    }

    // Intercept the alert
    page.on('dialog', async dialog => {
      console.log('Dialog message:', dialog.message());
      await dialog.accept();
    });

    // Submit
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForTimeout(1000)
    ]);

    // Reload page to verify persisted values are loaded
    await page.goto(base + '/client/company-profile', { waitUntil: 'networkidle2' });

    // Read back some values
    const read = async (name) => {
      const sel = `[formcontrolname="${name}"]`;
      await page.waitForSelector(sel);
      return page.$eval(sel, el => el.value);
    };

    const results = {
      raisonSociale: await read('raisonSociale'),
      matriculeFiscal: await read('matriculeFiscal'),
      ville: await read('ville'),
      managerNom: await page.$eval('[formgroupname="manager"] [formcontrolname="nomPrenom"]', el => el.value),
      capitalFirst: await page.$eval('[formarrayname="capitalStructure"] [formgroupname] [formcontrolname="nomPrenom"]', el => el.value)
    };

    console.log('Round-trip values:', results);

    // Verify directly in DB via mysql2
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({ host: '127.0.0.1', user: 'root', password: '', database: 'comptabilite_db' });
    try {
      // find user by email
      const [users] = await conn.execute('SELECT id, email FROM users WHERE email = ?', [email]);
      console.log('DB user rows:', users.length);
      if (users.length === 0) {
        console.error('User not found in DB for email', email);
        process.exit(3);
      }
      const userId = users[0].id;

      const [profiles] = await conn.execute('SELECT * FROM company_profiles WHERE user_id = ?', [userId]);
      console.log('DB company_profiles rows:', profiles.length);
      if (profiles.length === 0) {
        console.error('No company_profile row for user', userId);
        process.exit(4);
      }
      const profile = profiles[0];
      console.log('company_profiles row:', {
        raisonSociale: profile.raison_sociale,
        ville: profile.ville,
        matriculeFiscal: profile.matricule_fiscal,
        email: profile.email
      });

      const [managers] = await conn.execute('SELECT * FROM managers WHERE id = ?', [profile.manager_id]);
      console.log('managers row count:', managers.length);

      const [capital] = await conn.execute('SELECT * FROM capital_structure_entries WHERE company_profile_id = ?', [profile.id]);
      console.log('capital_structure_entries count:', capital.length);

      const [legal] = await conn.execute('SELECT * FROM legal_documents WHERE company_profile_id = ?', [profile.id]);
      console.log('legal_documents count:', legal.length);

      const [software] = await conn.execute('SELECT * FROM software_deposits WHERE company_profile_id = ?', [profile.id]);
      console.log('software_deposits count:', software.length);

      // Print details to inspect nulls
      console.log('manager row:', managers[0] || null);
      console.log('capital rows:', capital);
      console.log('legal rows:', legal);
      console.log('software rows:', software);

    } finally {
      await conn.end();
      await browser.close();
    }
    process.exit(0);
  } catch (err) {
    console.error('E2E error', err);
    await browser.close();
    process.exit(2);
  }
})();
