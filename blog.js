class BlogList {
  constructor() {

    this.element = document.querySelector('#blog-list');

    document.querySelector('#add-button').addEventListener('click', () => {
      this.createBlogDialog();
    })

    // Stores all blog items as objects
    let localStorage = window.localStorage;

    if (!localStorage.getItem('blogList')) {
      // Pre-populated blog
      this.list = [
        {
          title: 'My first blog',
          date: '2021-02-01',
          summary: 'Welcome to my blog!',
        },
        {
          title: 'My second blog',
          date: '2021-02-07',
          summary: 'Something something',
        },
        {
          title: 'My third blog',
          date: '2021-02-14',
          summary: 'Updates about blogs',
        },
      ];
      localStorage.setItem('blogList', JSON.stringify(this.list));
      this.populateBlogList();
    } else {
      this.list = JSON.parse(localStorage.getItem('blogList'));
      this.populateBlogList();
    }
  }

  add(blog) {
    this.list.push(blog);
    window.localStorage.setItem('blogList', JSON.stringify(this.list));

    let blogTemplate = document.querySelector('#blog-item-template');
    let blogItem = blogTemplate.content.cloneNode(true);

    blogItem.querySelector('.blog-title').textContent = blog.title;
    blogItem.querySelector('.blog-date').textContent = blog.date;
    blogItem.querySelector('.blog-date').dateTime = blog.date;
    blogItem.querySelector('.blog-summary').textContent = blog.summary;

    blogItem.querySelector('.edit-button').addEventListener('click', (e) => {
      this.createBlogDialog(this.list.indexOf(blog));
    });

    blogItem.querySelector('.delete-button').addEventListener('click', (e) => {
      this.createDeleteDialog(this.list.indexOf(blog));
    });

    this.element.appendChild(blogItem);
  }

  updateItem(index, blog) {
    this.list[index] = blog;
    window.localStorage.setItem('blogList', JSON.stringify(this.list));

    let blogItem = this.element.querySelectorAll('.blog-item')[index];
    blogItem.querySelector('.blog-title').textContent = blog.title;
    blogItem.querySelector('.blog-date').textContent = blog.date;
    blogItem.querySelector('.blog-date').dateTime = blog.date;
    blogItem.querySelector('.blog-summary').textContent = blog.summary;
  }

  deleteItem(index) {
    this.list.splice(index, 1);
    window.localStorage.setItem('blogList', JSON.stringify(this.list));

    let blogItem = this.element.querySelectorAll('.blog-item')[index];
    blogItem.remove();
  }

  populateBlogList() {
    for (let blog of this.list) {
      let blogTemplate = document.querySelector('#blog-item-template');
      let blogItem = blogTemplate.content.cloneNode(true);

      blogItem.querySelector('.blog-title').textContent = blog.title;
      blogItem.querySelector('.blog-date').textContent = blog.date;
      blogItem.querySelector('.blog-date').dateTime = blog.date;
      blogItem.querySelector('.blog-summary').textContent = blog.summary;

      blogItem.querySelector('.edit-button').addEventListener('click', (e) => {
        this.createBlogDialog(this.list.indexOf(blog));
      });

      blogItem.querySelector('.delete-button').addEventListener('click', (e) => {
        this.createDeleteDialog(this.list.indexOf(blog));
      });

      this.element.appendChild(blogItem);
    }


    localStorage.setItem('blogList', JSON.stringify(this.list));
  }

  createBlogDialog(index) {
    let blog = {
      title: "",
      date: "",
      summary: "",
    };
    let legend = "Add Blog";

    if (index !== undefined) {
      blog = this.list[index];
      legend = "Edit Blog"
    }

    let dialog = document.createElement('dialog');

    dialog.innerHTML = `
      <form method="dialog">
        <fieldset>
          <legend>${legend}</legend>
          <div>
            <label for="dialog-title">Title:</label>
            <input id="dialog-title" name="dialog-title" type="text" value="${blog.title}">
          </div>
          <div>
            <label for="dialog-date">Date:</label>
            <input id="dialog-date" name="dialog-date" type="date" value="${blog.date}">
          </div>
          <div style="display: flex; flex-direction: column;">
            <label for="dialog-summary">Summary:</label>
            <textarea id="dialog-summary" name="dialog-summary" rows="5" cols="30">${blog.summary}</textarea>
          </div>
          <menu>
            <button value="cancel">Cancel</button>
            <button value="submit">Confirm</button>
          </menu>
        </fieldset>
      </form>`;

    dialog.addEventListener('close', () => {
      if (dialog.returnValue === 'submit') {
        blog.title = dialog.querySelector('#dialog-title').value;
        blog.date = dialog.querySelector('#dialog-date').value;
        blog.summary = dialog.querySelector('#dialog-summary').value;

        if (index !== undefined) {
          this.updateItem(index, blog);
        } else {
          this.add(blog);
        }
      }

      dialog.remove();
    })

    document.body.appendChild(dialog);
    dialog.showModal();
  }

  createDeleteDialog(index) {

    let dialog = document.createElement('dialog');
    dialog.innerHTML = `
    <form method="dialog">
      <p>Are you sure you want to delete this blog?</p>
      <menu>
        <button value="false">Cancel</button>
        <button value="true">Confirm</button>
      </menu>
    </form>
  `

    dialog.addEventListener('close', () => {
      if (dialog.returnValue === 'true') {
        this.deleteItem(index);
      }

      dialog.remove();
    })

    document.body.appendChild(dialog);
    dialog.showModal();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  let blogList = new BlogList();
})