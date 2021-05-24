describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    const entries = await page.$$('journal-entry');
    const firstEntry = await entries[0];
    await firstEntry.click();
    await page.waitForTimeout(500);
    const urlLink = await page.url();
    expect(urlLink.includes("/#entry1")).toBe(true);
    console.log(urlLink);
  

  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 

    //const heading = await page.$('h1').innerContent;
    const headingText = await page.$eval('h1', el => el.textContent);
    console.log(headingText);
    expect(headingText).toMatch('Entry 1');
  
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */

      //const title = await page.$eval('entry-title', el => el.textContent);
      //console.log(title);
      //const date = await page.$eval('entry-date', el => el.textContent);
      //console.log(date);
      //const content = await page.$eval('entry-content', el => el.textContent);
      //console.log(content);
      
      const expected = { 
        title: 'You like jazz?',
        date: '4/25/2021',
        content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
        image: {
          src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
          alt: 'bee with sunglasses'
        }
      }
      const entry = await page.$eval('entry-page',el => el.entry);
      console.log(entry.entry);
      expect(entry).toEqual(expected);

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const singleClass = await page.$eval('body', el => el.className);
    console.log(singleClass);
    expect(singleClass).toEqual('single-entry');

  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.$eval('img', el => el.click());
    await page.waitForTimeout(500);
    const urlLink = await page.url();
    expect(urlLink.includes("/#settings")).toBe(true);
    console.log(urlLink);



  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const headingText = await page.$eval('h1', el => el.textContent);
    console.log(headingText);
    expect(headingText).toMatch('Settings');
  


  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const settingClass = await page.$eval('body', el => el.className);
    console.log(settingClass);
    expect(settingClass).toEqual('settings');

  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    await page.waitForTimeout(500);
    const urlLink = await page.url();
    expect(urlLink.includes("/#entry1")).toBe(true);
    console.log(urlLink);



  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    await page.goBack();
    await page.waitForTimeout(500);
    const urlLink = await page.url();
    expect(urlLink).toEqual("http://127.0.0.1:5500/");
    console.log(urlLink);


  });


  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user if on homepage, the header title should be "Journal Entries"', async() => {
    const headingText = await page.$eval('h1', el => el.textContent);
    console.log(headingText);
    expect(headingText).toMatch('Journal Entries');

  });


  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any attribute', async() => {
    const settingClass = await page.$eval('body', el => el.className);
    console.log(settingClass);
    expect(settingClass).toEqual("");


  });


  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async() =>{
    const entries = await page.$$('journal-entry');
    const secondEntry = await entries[1];
    await secondEntry.click();
    await page.waitForTimeout(500);
    const urlLink = await page.url();
    expect(urlLink.includes("/#entry2")).toBe(true);
    console.log(urlLink);
  });


  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async() => {
    const headingText = await page.$eval('h1', el => el.textContent);
    console.log(headingText);
    expect(headingText).toMatch('Entry 2');



  });


  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry ', async() => {
    const expected = { 
      title: 'Run, Forrest! Run!',
      date: '4/26/2021',
      content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      image: {
        src: 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
        alt: 'forrest running'
      }
    }
    const entry = await page.$eval('entry-page',el => el.entry);
    console.log(entry.entry);
    expect(entry).toEqual(expected);

  });


  // create your own test 17
  it('Test17: checks that settings icon link is correct ', async() => {
    const settingsIcon = await page.$eval('img', el => el.src);
    await page.waitForTimeout(500);
    expect(settingsIcon).toEqual("http://127.0.0.1:5500/styles/settings.svg");
    console.log(settingsIcon);

  });

  // create your own test 18
  it('Test18: Checks that when settings is clicked it takes us to the home page ', async() => {
    await page.$eval('h1', el => el.click());
    await page.waitForTimeout(500);
    const urlLink = await page.url();
    expect(urlLink).toEqual("http://127.0.0.1:5500/");
    console.log(urlLink);

  });

  // create your own test 19
  it('Test19: Checks that the entry10 has the correct url', async() => {
    const entries = await page.$$('journal-entry');
    const tenthEntry = await entries[9];
    await tenthEntry.click();
    await page.waitForTimeout(500);
    const urlLink = await page.url();
    expect(urlLink.includes("/#entry10")).toBe(true);
    console.log(urlLink);
  });


  // create your own test 20
  it('Test20: Checks that the heading is correct', async() => {
    const headingText = await page.$eval('h1', el => el.textContent);
    console.log(headingText);
    expect(headingText).toMatch('Entry 10');



  }); 

});
