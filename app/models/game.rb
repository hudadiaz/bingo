class Game
  @@rooms = {}

  attr :id, :players, :status, :number, :current_player_index, :current_player_id

  def initialize
    @id = SecureRandom.urlsafe_base64(12)
    @players = []
    @status = 'new'
    @@rooms[@id] = self
  end

  def self.find(id)
    @@rooms[id]
  end

  def join(player)
    if @status != 'playing'
      if @players.select { |e| e['id'] == player['id'] }.blank?
        @players.push player
        @status = 'joined'
      end
    end
  end

  def ready(player_id)
    if @status != 'playing'
      @status = 'ready'
      @players.map { |e| e['ready'] = true if e['id'] == player_id }
      start if @players.map { |e| e['ready'] }.reduce(:&)
    end
  end

  def start
    if @status == 'ready'
      @status = 'playing'
      @players.shuffle
      @current_player_index = 0
      @current_player_id = @players[@current_player_index]['id']
    end
  end

  def move(player_id, number)
    if @status == 'playing'
      @number = number
      @current_player_index = (@current_player_index+1) % @players.size 
      @current_player_id = @players[@current_player_index]['id']
    end
  end

  def update_player(updated_player)
    if @status == 'playing'
      @players.map { |e| e.merge!(updated_player) if e['id'] == updated_player['id'] }
    end
  end

  def end
    if @status == 'playing'
      @status = 'ended'
    end
  end
end