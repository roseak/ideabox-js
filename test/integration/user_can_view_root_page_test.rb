require "test_helper"

class UserCanViewRootPageTest < ActionDispatch::IntegrationTest

  def teardown
    Capybara.reset_sessions!
  end

  test "user can view root page" do
    visit root_path

    assert page.has_content?("IdeaBox")
  end
end
