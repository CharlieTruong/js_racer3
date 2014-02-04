class Player < ActiveRecord::Base
  has_many :rounds
  has_many :games, through: :rounds
  validates :name, uniqueness: true
end
