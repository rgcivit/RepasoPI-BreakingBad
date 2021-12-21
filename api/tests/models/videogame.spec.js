const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Super Mario Bros' });
      });
    });
  });
});

describe('Validator Root 2', ()=> {
  beforeEach(() => Genre.sync({force:true}));
  describe('name', ()=> {
    it('should throw an error if name ies null', (done) => {
      Genre.create({})
        .then(()=> done (new Error('it requires a valid name')))
        .catch(() => done())
    });
    it('should work when its a valid name', ()=> {
      Genre.create({name: 'action'});
    });
    it('name should be a string', ()=> {
      expect(typeof Genre.name).equal('string');
    })
  })
})
