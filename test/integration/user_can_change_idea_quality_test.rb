require "test_helper"

class UserCanChangeIdeaQualityTest < ActionDispatch::IntegrationTest
  def teardown
    Capybara.reset_sessions!
  end

  test "user can thumbs up an idea" do
    visit "/"
    first("#thumbs-up-idea").click
    assert page.has_content?("plausible")

    first("#thumbs-up-idea").click
    within(first(".idea")) do
      assert page.has_content?("genius")
    end
  end

  test "user can thumbs down an idea" do
    visit "/"
    first("#thumbs-up-idea").click
    first("#thumbs-up-idea").click
    first("#thumbs-down-idea").click
    assert page.has_content?("plausible")

    first("#thumbs-down-idea").click
    within(first(".idea")) do
      assert page.has_content?("swill")
    end
  end
end
