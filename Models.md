**School:**

    ```
    GET /shop/school
    Headers: Bearer token
    ```

    Model:
    ```
    token(string)
    openProductModal(Boolean): default=false
    openProductEditModal(Boolean): default:false
    id(string)
    name(string): School Name
    code(string): "UC" or "US" or sth else
    desc(string)
    price(string)
    discount(string)
    file(string)
    fileName(string)
    page(number): default=1
    search(string)
    schools(list)
    pages(number): default=0
    loading(Boolean): default=false
    ```

**Subject:**

    ```
    GET /shop/subjects?school=params
    Params: school(School Name)
    Headers: Bearer token
    ```

    Model:
    ```
    token(string)
    openProductModal(Boolean): default=false
    openProductEditModal(Boolean): default:false
    id(string)
    name(string): Subjects Name
    code(string)
    desc(string)
    price(string)
    discount(string)
    file(string)
    fileName(string)
    page(number): default=1
    search(string)
    subjects(list)
    pages(number): default=0
    loading(Boolean): default=false
    ```

**Courses:**

    ```
    POST /dashboard/add
    Headers: Bearer token
    Content-Type: "application/json"

    GET /shop/course?school=params
    Params: school(School Name)+&subject(Subject Name)
    Headers: Bearer token
    ```

    Model:
    ```
    usr_id(string)
    token(string)
    openProductModal(Boolean): default=false
    openProductEditModal(Boolean): default:false
    id(string)
    name(string): Subjects Name
    code(string)
    registrationNumber(string)
    instructors(string or list)
    unit(string)
    location(string)
    type(string)
    time(string or datetime)
    action(string): not sure if we need this
    desc(string)
    price(string)
    discount(string)
    file(string)
    fileName(string)
    page(number): default=1
    search(string)
    courses(list)
    pages(number): default=0
    loading(Boolean): default=false
    ```

**Dashboard:**

    ```
    GET /dashboard
    Headers: Bearer token

    DELETE /dashboard/delete
    Headers: Bearer token
    Content-Type: "application/json"
    ```

    Model:
    ```
    usr_id(string)
    token(string)
    openProductModal(Boolean): default=false
    openProductEditModal(Boolean): default:false
    id(string)
    name(string)
    file(string)
    filename(string)
    page(number): default=1
    search(string)
    courses(list)
    pages(number): default=0
    loading(Boolean): default=false
