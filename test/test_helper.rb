require 'SimpleCov'
SimpleCov.start('rails')

ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'minitest/pride'
require 'minitest/unit'
require 'mocha/mini_test'

class ActiveSupport::TestCase
  fixtures :all
  include Capybara::DSL
end
