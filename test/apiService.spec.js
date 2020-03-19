const esmImport = require('esm')(module);
const apiService = esmImport('../src/js/apiService.js').default;

describe('Testing apiService: ', () => {
  describe('Change to page: ', () => {
    beforeEach(() => {
      apiService.page = 1;
    });
    test('Should to up page on one: ', () => {
      const update = () => {
        apiService.updatePage();
        return apiService.page;
      };
      expect(update()).toBe(2);
    });
    test('Should don`t down page, because page = 1: ', () => {
      const downgrade = () => {
        apiService.downgradePage();
        return apiService.page;
      };
      expect(downgrade()).toBe(1);
    });
    test('Should to down page on one: ', () => {
      apiService.page = 5;
      const downgrade = () => {
        apiService.downgradePage();
        return apiService.page;
      };
      expect(downgrade()).toBe(4);
    });
    test('Should to down page for first: ', () => {
      apiService.page = 10;
      const reset = () => {
        apiService.resetPage();
        return apiService.page;
      };
      expect(reset()).toBe(1);
    });
  });
});
