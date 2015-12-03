require "test_helper"

class UserCanEditAnIdeaTest < ActionDispatch::IntegrationTest
  def teardown
    Capybara.reset_sessions!
  end

  test "user can edit an idea title" do
    visit "/"
    title = first(:xpath, "//h5[@contenteditable='true']")
    title.set("pizza yum")
    title.native.send_keys(:return)
    assert page.has_content?("pizza yum")
  end

  test "user can edit an idea body" do
    visit "/"
    body = first(:xpath, "//p[@contenteditable='true']")
    body.set("almost done")
    body.native.send_keys(:return)
    assert page.has_content?("almost done")
  end
end
