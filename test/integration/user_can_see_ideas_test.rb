require "test_helper"

class UserCanSeeIdeasTest < ActionDispatch::IntegrationTest
  def teardown
    Capybara.reset_sessions!
  end

  test "user can see ideas on the page" do
    visit "/"
    assert page.has_content?("Testing")
    assert page.has_content?("For All The Green Dots")
    assert page.has_content?("swill")
  end

  test "ideas appear based on when they were created" do
    visit "/"
    assert page.all(".idea").first.has_content?("Dinner")
  end

  test "ideas are truncated by the word when longer than 100 characters" do
    visit "/"
    assert page.has_content?("When truncated, the idea is harder to see.  But who really cares about this dumb idea anyway? ...")
  end
end
