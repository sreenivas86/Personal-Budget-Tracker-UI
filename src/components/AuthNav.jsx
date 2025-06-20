import React from "react";

function AuthNav() {
  return (
    <div>
      <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
        <li class="nav-item" role="presentation">
          <a
            class="nav-link active"
            id="tab-login"
            data-mdb-pill-init
            href="#pills-login"
            role="tab"
            aria-controls="pills-login"
            aria-selected="true"
          >
            Login
          </a>
        </li>
        <li class="nav-item" role="presentation">
          <a
            class="nav-link"
            id="tab-register"
            data-mdb-pill-init
            href="#pills-register"
            role="tab"
            aria-controls="pills-register"
            aria-selected="false"
          >
            Register
          </a>
        </li>
      </ul>
    </div>
  );
}

export default AuthNav;
