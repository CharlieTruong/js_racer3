class CreateTables < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name, :null => false, :unique => true
      t.timestamps
    end

    create_table :games do |t|
      t.string :winner
      t.integer :time
      t.timestamps
    end

    create_table :rounds do |t|
      t.integer :player_id
      t.integer :game_id
      t.timestamps
    end
  end
end
