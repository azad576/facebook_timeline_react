<script>
  document.addEventListener('DOMContentLoaded', function() {
    const settingmenu = document.querySelector('.setting-menu')
    const darkbtn = document.getElementById('dark_btn')

    const settingmentu_toggle = function() {
      settingmenu.classList.toggle('setting_menu_height')
    };

    const darkBtnClickHandler = function() {
      darkbtn.classList.toggle('dark_btn_on')
     { document}.body.classList.toggle('dark_theme')
    }

    darkbtn.addEventListener('click', darkBtnClickHandler);
  });
</script>
