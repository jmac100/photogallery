import { PhotoGalleryPage } from './app.po';

describe('photo-gallery App', function() {
  let page: PhotoGalleryPage;

  beforeEach(() => {
    page = new PhotoGalleryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
